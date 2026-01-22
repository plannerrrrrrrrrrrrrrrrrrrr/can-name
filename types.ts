
export type Category = 'All' | 'Coffee' | 'Tea' | 'Soda' | 'Juice' | 'Cocktail' | 'Dessert Drink';

export interface Beverage {
  id: string;
  name: string;
  category: Category;
  description: string;
  imageUrl: string;
  isAI?: boolean;
}

export interface RecommendationRequest {
  mood: string;
  flavor: string;
}
