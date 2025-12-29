import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/42/1920/1080" 
          alt="Coffee Ambience" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-coffee-900"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <div className="mb-6 animate-fade-in-up">
           <span className="inline-block py-1 px-3 border border-gold-DEFAULT/50 rounded-full text-gold-DEFAULT text-xs uppercase tracking-[0.2em] mb-4">
             Est. 2024
           </span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight">
          Brewed for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic pr-2">
            Perfection
          </span>
        </h1>
        <p className="text-lg md:text-xl text-stone-300 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
          Experience the art of coffee at Mr. Beans. Where every bean tells a story, and every cup is a masterpiece tailored to your taste.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#menu" 
            className="px-8 py-3 bg-gold-DEFAULT text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300"
          >
            View Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;