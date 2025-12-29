import React from 'react';

interface FooterProps {
  onOpenKitchen?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenKitchen }) => {
  return (
    <footer id="contact" className="bg-black py-20 border-t border-stone-900 text-center md:text-left">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand */}
        <div className="space-y-6">
           <h2 className="text-3xl font-serif font-bold text-gold-DEFAULT italic">Mr. Beans</h2>
           <p className="text-stone-500 text-sm leading-loose max-w-xs mx-auto md:mx-0">
             Crafting the perfect cup since 2024. We believe in sustainable beans, expert roasting, and the warmth of a good conversation.
           </p>
        </div>

        {/* Location & Hours */}
        <div className="space-y-4">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Visit Us</h3>
          <p className="text-stone-400">123 Espresso Lane<br/>Coffee City, CA 90210</p>
          <div className="h-px w-12 bg-stone-800 mx-auto md:mx-0 my-4"></div>
          <p className="text-stone-400 text-sm">
            <span className="text-gold-DEFAULT">Mon - Fri:</span> 7am - 8pm<br/>
            <span className="text-gold-DEFAULT">Sat - Sun:</span> 8am - 9pm
          </p>
        </div>

        {/* Social / Newsletter */}
        <div className="space-y-4">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Stay Connected</h3>
          <div className="flex justify-center md:justify-start gap-4">
            {['Instagram', 'Twitter', 'Facebook'].map(social => (
              <a key={social} href="#" className="text-stone-500 hover:text-gold-DEFAULT transition-colors text-sm">
                {social}
              </a>
            ))}
          </div>
          <p className="text-stone-600 text-xs mt-8">
            © 2024 Mr. Beans Cafe. All rights reserved.
          </p>
          
          {/* Staff Access Link */}
          {onOpenKitchen && (
             <button 
               onClick={onOpenKitchen}
               className="text-stone-800 hover:text-stone-600 text-[10px] uppercase tracking-widest mt-4 block mx-auto md:mx-0 transition-colors"
             >
               Staff Access
             </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;