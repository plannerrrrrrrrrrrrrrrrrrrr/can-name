
import { Beverage, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'Coffee', 'Tea', 'Soda', 'Juice', 'Cocktail', 'Dessert Drink'];

export const INITIAL_BEVERAGES: Beverage[] = [
  {
    id: '1',
    name: '아이스 아메리카노',
    category: 'Coffee',
    description: '엄선된 원두를 다크 로스팅하여 추출한 에스프레소의 깊은 풍미를 시원하게 즐길 수 있는 음료',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: '말차 라떼',
    category: 'Tea',
    description: '최상급 교토산 말차 가루와 신선한 우유가 어우러져 쌉싸름하면서도 고소한 맛이 일품인 음료',
    imageUrl: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: '클래식 모히또',
    category: 'Cocktail',
    description: '신선한 라임과 민트, 설탕, 탄산수가 만나 상큼함의 극치를 보여주는 무알콜 칵테일',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: '자몽 에이드',
    category: 'Soda',
    description: '생자몽을 직접 착즙하여 톡 쏘는 탄산수와 함께 청량감을 극대화한 시그니처 에이드',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    name: '애플 망고 스무디',
    category: 'Juice',
    description: '달콤한 애플 망고 원물을 가득 넣어 진한 맛과 향을 동시에 느낄 수 있는 프리미엄 스무디',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    name: '얼그레이 티',
    category: 'Tea',
    description: '은은한 베르가모트 향이 매력적인 전통 홍차로 마음을 차분하게 해주는 티',
    imageUrl: 'https://images.unsplash.com/photo-1594631252845-29fc458681b7?auto=format&fit=crop&q=80&w=800'
  }
];
