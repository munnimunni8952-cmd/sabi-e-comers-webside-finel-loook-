import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data';

const Collections = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pb-32">
      <div className="text-center mb-24 space-y-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="h-[1px] w-12 bg-gold-400" />
          <span className="text-gold-400 font-bold tracking-[0.4em] text-xs uppercase">The Archives</span>
          <span className="h-[1px] w-12 bg-gold-400" />
        </div>
        <h1 className="font-serif text-5xl md:text-7xl text-white tracking-tight">Our Collections</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto font-light leading-relaxed">
          Explore our meticulously curated selections, where each piece tells a story of heritage and innovation.
        </p>
      </div>

      <div className="space-y-32">
        {CATEGORIES.map((cat, idx) => (
          <motion.div 
            key={cat.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
          >
            <div className="lg:w-1/2 relative group">
              <div className="aspect-[16/10] overflow-hidden border border-gold-900/10">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className={`absolute -bottom-10 ${idx % 2 === 0 ? '-right-10' : '-left-10'} h-40 w-40 border border-gold-400/20 -z-10 hidden lg:block`} />
            </div>

            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <span className="text-gold-600 font-bold tracking-[0.3em] text-[11px] uppercase">Curated Selects</span>
                <h2 className="font-serif text-4xl md:text-5xl text-white">{cat.name} Collection</h2>
                <div className={`h-[1px] w-24 bg-gold-600 ${idx % 2 === 0 ? 'mx-0' : 'mx-auto lg:mx-0'}`} />
              </div>
              <p className="text-gray-400 leading-relaxed text-lg font-light">
                Our {cat.name} collection represents the pinnacle of luxury, combining rare materials with unparalleled craftsmanship for the discerning individual.
              </p>
              <Link 
                to={`/shop?category=${cat.id}`}
                className="inline-block border border-gold-400 text-gold-400 px-10 py-4 font-bold tracking-[0.2em] text-xs hover:bg-gold-400 hover:text-luxury-black transition-all"
              >
                DISCOVER THE COLLECTION
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
