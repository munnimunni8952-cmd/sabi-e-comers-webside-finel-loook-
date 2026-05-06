import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, Zap } from 'lucide-react';
import { Product } from '../data';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { trackEvent } from '../services/fbPixelService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    trackEvent('AddToCart', {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'INR'
    });
    trackEvent('InitiateCheckout', {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'INR',
      num_items: 1
    });
    navigate('/checkout');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-luxury-charcoal group">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {product.tag && (
            <div className="absolute top-4 left-4 z-10 bg-gold-600 text-luxury-black text-[9px] font-bold tracking-widest px-3 py-1.5 uppercase">
              {product.tag}
            </div>
          )}
          
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex gap-4 pointer-events-auto">
            <button 
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white text-luxury-black p-3 rounded-full hover:bg-gold-400 transition-colors"
            >
              <Eye size={20} />
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
                trackEvent('AddToCart', {
                  content_name: product.name,
                  content_category: product.category,
                  content_ids: [product.id],
                  content_type: 'product',
                  value: product.price,
                  currency: 'INR'
                });
              }}
              className="bg-luxury-black text-gold-400 p-3 rounded-full hover:bg-gold-400 hover:text-luxury-black border border-gold-400/30 transition-colors z-20"
            >
              <ShoppingBag size={20} />
            </button>
          </div>
          
          <button 
            onClick={handleBuyNow}
            className="bg-gold-600 text-luxury-black px-6 py-2 rounded-full font-bold tracking-widest text-[10px] hover:bg-gold-500 transition-all transform hover:scale-105 flex items-center gap-2 pointer-events-auto"
          >
            <Zap size={14} fill="currentColor" /> BUY NOW
          </button>
        </div>
      </div>

      <div className="mt-6 text-center space-y-1">
        <p className="text-[10px] text-gold-600 uppercase tracking-[0.2em]">{product.category}</p>
        <h3 className="font-serif text-lg text-white group-hover:text-gold-400 transition-colors">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-gold-400 font-medium tracking-widest text-sm">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
