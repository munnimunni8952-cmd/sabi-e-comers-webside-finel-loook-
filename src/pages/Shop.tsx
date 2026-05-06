import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';
import { Filter, SlidersHorizontal } from 'lucide-react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = PRODUCTS.filter(p => 
    categoryFilter ? p.category === categoryFilter : true
  ).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // Default newest
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <div className="space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl text-white">The Collection</h1>
          <p className="text-gray-400 text-sm tracking-[0.1em] uppercase">
            Viewing {filteredProducts.length} Exclusive Items
          </p>
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="flex items-center gap-3 border-b border-gold-900/30 pb-2 flex-grow md:flex-grow-0">
            <SlidersHorizontal size={16} className="text-gold-600" />
            <select 
              value={categoryFilter || 'all'} 
              onChange={(e) => setSearchParams(e.target.value === 'all' ? {} : { category: e.target.value })}
              className="bg-transparent text-xs font-bold tracking-widest text-gold-400 focus:outline-none cursor-pointer uppercase"
            >
              <option value="all">ALL CATEGORIES</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 border-b border-gold-900/30 pb-2 flex-grow md:flex-grow-0">
            <Filter size={16} className="text-gold-600" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold tracking-widest text-gold-400 focus:outline-none cursor-pointer uppercase"
            >
              <option value="newest">NEWEST</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-6">
          <h2 className="font-serif text-3xl text-gray-500">No items found in this category</h2>
          <button 
            onClick={() => setSearchParams({})}
            className="text-gold-400 border-b border-gold-400 pb-1 font-bold tracking-widest text-xs uppercase"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
