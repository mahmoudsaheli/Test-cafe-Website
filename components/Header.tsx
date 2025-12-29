import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenCart: () => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onOpenCart, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-coffee-900/90 backdrop-blur-md py-3 shadow-lg border-b border-gold-DEFAULT/20' : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Logo representation based on user image */}
          <div className="w-10 h-10 rounded-full border-2 border-gold-DEFAULT bg-black flex items-center justify-center relative overflow-hidden">
             <div className="text-gold-DEFAULT text-xs font-serif italic">MB</div>
          </div>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-gold-DEFAULT tracking-wide">
            Mr. Beans <span className="text-xs md:text-sm font-sans font-light text-stone-300 block -mt-1 tracking-widest uppercase">Cafe</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {['Menu', 'Experience', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-stone-300 hover:text-gold-DEFAULT transition-colors uppercase text-xs tracking-widest font-bold"
            >
              {item}
            </a>
          ))}
          <button 
            onClick={onOpenCart}
            className="px-5 py-2 border border-gold-DEFAULT text-gold-DEFAULT hover:bg-gold-DEFAULT hover:text-black transition-all rounded-sm uppercase text-xs tracking-widest font-bold flex items-center gap-2"
          >
            Order Online
            {cartCount > 0 && (
              <span className="bg-white text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Cart Button */}
        <button 
          onClick={onOpenCart}
          className="md:hidden p-2 text-gold-DEFAULT relative"
          aria-label="Open Cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-white text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-md">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;