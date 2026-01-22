
import React from 'react';
import { Beverage } from '../types';

interface ModalProps {
  beverage: Beverage | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ beverage, onClose }) => {
  if (!beverage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col md:flex-row h-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center z-20 backdrop-blur-md transition-colors"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
        
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img 
            src={beverage.imageUrl} 
            alt={beverage.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
             <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              {beverage.category}
            </span>
            {beverage.isAI && (
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                AI GENERATED
              </span>
            )}
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{beverage.name}</h2>
          <div className="w-12 h-1.5 bg-indigo-600 rounded-full mb-6"></div>
          
          <div className="prose prose-slate prose-sm">
            <h4 className="text-slate-900 font-bold mb-2">설명</h4>
            <p className="text-slate-600 leading-relaxed mb-6">
              {beverage.description}
            </p>
            
            <h4 className="text-slate-900 font-bold mb-2">추천 페어링</h4>
            <ul className="text-slate-600 list-disc list-inside space-y-1">
              <li>달콤한 디저트 플레이트</li>
              <li>담백한 크래커나 비스킷</li>
              <li>평온한 오후의 음악 한 잔</li>
            </ul>
          </div>

          <button 
            onClick={onClose}
            className="mt-8 w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
