import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { trackEvent } from '../services/fbPixelService';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();
  const shippingThreshold = 15000;
  const isFreeShipping = cartTotal > shippingThreshold;

  const handleCheckout = () => {
    trackEvent('InitiateCheckout', {
      content_ids: cart.map(item => item.id),
      content_type: 'product',
      value: isFreeShipping ? cartTotal : cartTotal + 1000,
      currency: 'INR',
      num_items: cartCount
    });
    navigate('/checkout');
  };

  if (cartCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-8">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full border-2 border-gold-900/20 flex items-center justify-center text-gold-900/40">
            <ShoppingBag size={48} />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="font-serif text-4xl text-white">Your bag is empty</h1>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
            Discover our premium selection of timepieces and accessories and elevate your presence.
          </p>
        </div>
        <Link 
          to="/shop" 
          className="inline-block bg-gold-600 text-luxury-black px-12 py-4 font-bold tracking-[0.2em] text-xs hover:bg-gold-500 transition-colors"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h1 className="font-serif text-4xl md:text-5xl text-white mb-16 text-center">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-8">
          <div className="hidden md:grid grid-cols-12 pb-6 border-b border-gold-900/20 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
            <div className="col-span-6">PRODUCT</div>
            <div className="col-span-2 text-center">PRICE</div>
            <div className="col-span-2 text-center">QUANTITY</div>
            <div className="col-span-2 text-right">TOTAL</div>
          </div>

          <div className="space-y-8">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-gold-900/10 pb-8 last:border-0"
                >
                  <div className="col-span-6 flex items-center gap-6">
                    <div className="h-32 w-24 bg-luxury-charcoal overflow-hidden group">
                      <img src={item.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={item.name} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] text-gold-600 uppercase tracking-widest">{item.category}</p>
                      <h3 className="font-serif text-xl text-white">
                        <Link to={`/product/${item.id}`} className="hover:text-gold-400 transition-colors uppercase">{item.name}</Link>
                      </h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-red-500/60 hover:text-red-500 text-[10px] font-bold tracking-widest uppercase transition-colors"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-gold-400 font-medium md:block hidden">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border border-gold-900/30">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-3 text-gold-600 hover:text-gold-400 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white tracking-widest">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-3 text-gold-600 hover:text-gold-400 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-right md:text-gold-400 font-bold tracking-widest">
                    <span className="md:hidden text-gray-500 mr-2 text-[10px]">Total:</span>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="bg-luxury-charcoal border border-gold-900/20 p-10 space-y-8 sticky top-28">
            <h2 className="text-xs font-bold tracking-[0.2em] text-white uppercase border-b border-gold-900/10 pb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Subtotal</span>
                <span className="text-white font-medium">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Shipping</span>
                <span className={isFreeShipping ? 'text-green-500 font-bold text-xs tracking-widest uppercase' : 'text-white'}>
                  {isFreeShipping ? 'FREE' : '₹1,000.00'}
                </span>
              </div>
              {!isFreeShipping && (
                <p className="text-[10px] text-gold-600 italic">
                  Spend ₹{(shippingThreshold - cartTotal).toLocaleString('en-IN')} more for free shipping
                </p>
              )}
            </div>

            <div className="pt-6 border-t border-gold-900/20">
              <div className="flex justify-between items-center mb-10">
                <span className="text-white font-bold tracking-widest text-xs uppercase">Est. Total</span>
                <span className="text-gold-400 text-2xl font-bold">₹{(isFreeShipping ? cartTotal : cartTotal + 1000).toLocaleString('en-IN')}</span>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-gold-600 text-luxury-black py-4 font-bold tracking-[0.3em] text-xs hover:bg-gold-500 transition-all flex items-center justify-center gap-3 group"
              >
                PROCEED TO CHECKOUT <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-[10px] text-gray-500 leading-relaxed text-center italic">
                By proceeding to checkout you agree to the <br /> 
                <Link to="#" className="underline hover:text-white">Terms & Conditions</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
