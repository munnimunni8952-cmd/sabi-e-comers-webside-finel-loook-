import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Toast = () => {
  const { notification } = useCart();

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-10 left-1/2 z-[100] bg-white/10 backdrop-blur-xl border border-gold-400/30 px-6 py-4 rounded-full flex items-center gap-4 shadow-2xl shadow-gold-600/20"
        >
          <div className="bg-gold-600 rounded-full p-1.5">
            <CheckCircle size={14} className="text-luxury-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gold-600 tracking-widest uppercase">Added to bag</span>
            <span className="text-sm text-white font-medium truncate max-w-[200px]">{notification.productName}</span>
          </div>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="ml-2 pl-4 border-l border-white/10"
          >
            <ShoppingBag size={20} className="text-gold-400" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
