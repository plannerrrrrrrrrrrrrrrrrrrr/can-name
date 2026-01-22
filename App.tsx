
import React, { useState, useMemo, useEffect } from 'react';
import { Beverage, Category } from './types';
import { INITIAL_BEVERAGES, CATEGORIES } from './constants';
import BeverageCard from './components/BeverageCard';
import Modal from './components/Modal';
import { createAIBeverage } from './services/geminiService';

const App: React.FC = () => {
  const [beverages, setBeverages] = useState<Beverage[]>(INITIAL_BEVERAGES);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedBev, setSelectedBev] = useState<Beverage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // AI generation states
  const [mood, setMood] = useState('행복한');
  const [flavor, setFlavor] = useState('상큼한');

  const filteredBeverages = useMemo(() => {
    return beverages.filter(bev => {
      const matchesCategory = selectedCategory === 'All' || bev.category === selectedCategory;
      const matchesSearch = bev.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            bev.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [beverages, selectedCategory, searchTerm]);

  const handleCreateAI = async () => {
    setIsGenerating(true);
    try {
      const newBev = await createAIBeverage(mood, flavor);
      setBeverages(prev => [newBev, ...prev]);
      setSelectedBev(newBev);
    } catch (error) {
      console.error("AI 생성 실패:", error);
      alert("음료를 생성하는 중에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <i className="fa-solid fa-wine-glass-empty text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Bev<span className="text-indigo-600">Verse</span>
            </h1>
          </div>
          
          <div className="relative group max-w-md w-full">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="음료 이름 또는 설명 검색..."
              className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        {/* Hero & AI Interaction */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                Discover the perfect sip
              </span>
              <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                취향을 넘어 <br/>
                <span className="text-indigo-600">감각으로 전해지는</span> <br/>
                한 잔의 여유
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                세상의 다양한 음료를 탐색하고, 당신의 기분과 선호하는 맛을 바탕으로 AI가 단 하나뿐인 시그니처 레시피를 만들어드립니다.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#explore" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                  둘러보기 <i className="fa-solid fa-arrow-down text-sm"></i>
                </a>
                <button 
                  onClick={() => document.getElementById('ai-creator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  AI 음료 생성 <i className="fa-solid fa-wand-magic-sparkles text-indigo-600"></i>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[3rem] opacity-20 blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1544145945-f904253d0c7b?auto=format&fit=crop&q=80&w=1200" 
                alt="Main beverage"
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[500px]"
              />
            </div>
          </div>
        </section>

        {/* AI Generator Section */}
        <section id="ai-creator" className="mb-24 scroll-mt-24">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[100px] -mr-48 -mt-48"></div>
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl font-bold mb-4">AI Drink Lab</h3>
              <p className="text-slate-400 mb-10 text-lg">
                지금 당신의 기분과 원하는 맛을 알려주세요. <br/>
                세상에 없던 새로운 음료를 디자인해 드립니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">오늘의 기분</label>
                  <select 
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    <option value="행복한" className="text-slate-900">행복한</option>
                    <option value="지친" className="text-slate-900">지친</option>
                    <option value="설레는" className="text-slate-900">설레는</option>
                    <option value="차분한" className="text-slate-900">차분한</option>
                    <option value="에너지 넘치는" className="text-slate-900">에너지 넘치는</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">선호하는 맛</label>
                  <select 
                    value={flavor}
                    onChange={(e) => setFlavor(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    <option value="상큼한" className="text-slate-900">상큼한</option>
                    <option value="달콤한" className="text-slate-900">달콤한</option>
                    <option value="쌉싸름한" className="text-slate-900">쌉싸름한</option>
                    <option value="부드러운" className="text-slate-900">부드러운</option>
                    <option value="청량한" className="text-slate-900">청량한</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleCreateAI}
                disabled={isGenerating}
                className={`w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isGenerating ? (
                  <>
                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                    음료를 디자인하는 중...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-sparkles"></i>
                    나만의 시그니처 음료 만들기
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="explore" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Explore Gallery</h3>
              <p className="text-slate-500">카테고리별로 다양한 음료의 세계를 만나보세요.</p>
            </div>
            
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredBeverages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBeverages.map(bev => (
                <BeverageCard 
                  key={bev.id} 
                  beverage={bev} 
                  onClick={setSelectedBev}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="text-6xl mb-6 text-slate-200">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <p className="text-slate-400 font-medium">검색 결과가 없습니다.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 text-sm">
          <div className="flex items-center gap-2 grayscale opacity-70">
            <div className="w-8 h-8 bg-slate-400 rounded-lg flex items-center justify-center text-white">
              <i className="fa-solid fa-wine-glass-empty text-lg"></i>
            </div>
            <span className="text-slate-900 font-bold text-lg">BevVerse</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-600 transition-colors">이용약관</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">문의하기</a>
          </div>
          <p>© 2024 BevVerse. All rights reserved.</p>
        </div>
      </footer>

      {/* Details Modal */}
      <Modal 
        beverage={selectedBev} 
        onClose={() => setSelectedBev(null)} 
      />
    </div>
  );
};

export default App;
