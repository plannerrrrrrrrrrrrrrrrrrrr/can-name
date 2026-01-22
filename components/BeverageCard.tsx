
import React from 'react';
import { Beverage } from '../types';

interface BeverageCardProps {
  beverage: Beverage;
  onClick: (bev: Beverage) => void;
}

const BeverageCard: React.FC<BeverageCardProps> = ({ beverage, onClick }) => {
  return (
    <div 
      onClick={() => onClick(beverage)}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full border border-slate-100 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={beverage.imageUrl} 
          alt={beverage.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {beverage.isAI && (
            <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <i className="fa-solid fa-wand-magic-sparkles"></i> AI Created
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            {beverage.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {beverage.name}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
          {beverage.description}
        </p>
        <div className="mt-auto pt-4 flex justify-between items-center">
          <span className="text-indigo-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            상세보기 <i className="fa-solid fa-arrow-right text-xs"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BeverageCard;
