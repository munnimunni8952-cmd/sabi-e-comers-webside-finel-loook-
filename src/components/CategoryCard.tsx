import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../data';
import { motion } from 'motion/react';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="flex flex-col items-center group"
    >
      <Link to={`/shop?category=${category.id}`} className="block relative">
        <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-gold-900/20 p-1 group-hover:border-gold-600 transition-all duration-500 shadow-2xl shadow-gold-600/5">
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <img 
              src={category.image} 
              alt={category.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
              referrerPolicy="no-referrer"
            />
            {/* Dark overlay that fades on hover */}
            <div className="absolute inset-0 bg-luxury-black/30 group-hover:bg-transparent transition-all duration-500" />
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none" />
          </div>
        </div>
      </Link>
      
      <div className="mt-6 text-center">
        <h3 className="text-xs md:text-sm font-bold tracking-[0.3em] text-white uppercase group-hover:text-gold-400 transition-colors duration-300">
          {category.name}
        </h3>
        <div className="h-[1px] w-0 group-hover:w-full bg-gold-600 mx-auto mt-2 transition-all duration-300" />
        <Link 
          to={`/shop?category=${category.id}`}
          className="text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-2 block hover:text-gold-400 transition-colors"
        >
          Explore
        </Link>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
