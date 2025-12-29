import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  // Track recently added items for visual feedback
  const [addedItems, setAddedItems] = useState<{[key: string]: boolean}>({});

  const handleItemClick = (item: MenuItem) => {
    onAddToCart(item);
    
    // Trigger feedback animation
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1000);
  };

  return (
    <section id="menu" className="py-20 md:py-24 bg-[#121010]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-gold-DEFAULT uppercase tracking-widest text-xs font-bold mb-2 block">Discover Our Taste</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Signature Menu</h2>
          <div className="w-24 h-[1px] bg-stone-700 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {MENU_ITEMS.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleItemClick(item)}
              className="group relative bg-stone-900/50 border border-stone-800 hover:border-gold-DEFAULT/50 active:scale-[0.98] transition-all duration-200 overflow-hidden cursor-pointer select-none rounded-sm"
            >
              <div className="h-48 md:h-64 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                
                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 bg-gold-DEFAULT text-black font-bold px-3 py-1 text-sm shadow-lg">
                  ${item.price.toFixed(2)}
                </div>

                {/* Added Feedback Overlay */}
                <div 
                  className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                    addedItems[item.id] ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="bg-gold-DEFAULT text-black px-4 py-2 font-bold uppercase tracking-widest text-sm rounded-sm transform scale-110">
                    Added!
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gold-600 text-xs uppercase tracking-widest font-bold">{item.category}</span>
                </div>
                
                <h3 className="text-xl font-serif text-white mb-3 group-hover:text-gold-DEFAULT transition-colors">
                  {item.name}
                </h3>
                
                <p className="text-stone-400 text-sm leading-relaxed mb-6 font-light line-clamp-2 md:line-clamp-none">
                  {item.description}
                </p>
                
                <div className="flex items-center text-stone-300 text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                  <span className="border-b border-transparent group-hover:border-gold-DEFAULT pb-1">
                    Add to Order
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-gold-DEFAULT" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;