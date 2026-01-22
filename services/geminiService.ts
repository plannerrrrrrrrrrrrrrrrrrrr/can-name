
import { GoogleGenAI, Type } from "@google/genai";
import { Beverage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getBeverageRecommendation = async (mood: string, flavor: string): Promise<{ name: string; description: string }> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `사용자의 기분은 "${mood}"이고, 선호하는 맛은 "${flavor}"입니다. 이에 어울리는 특별한 음료 한 가지를 추천하고 그 이유를 설명해주세요.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: '음료의 이름' },
          description: { type: Type.STRING, description: '음료에 대한 상세 설명과 추천 이유' },
        },
        required: ["name", "description"]
      },
    },
  });

  return JSON.parse(response.text.trim());
};

export const generateBeverageImage = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A professional, high-quality, commercial photography style of a beverage named: ${prompt}. Artistic background, refreshing lighting.` },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("이미지 생성에 실패했습니다.");
};

export const createAIBeverage = async (mood: string, flavor: string): Promise<Beverage> => {
  const info = await getBeverageRecommendation(mood, flavor);
  const imageUrl = await generateBeverageImage(info.name);
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: info.name,
    category: 'Dessert Drink', // Default to a broad category
    description: info.description,
    imageUrl: imageUrl,
    isAI: true
  };
};
