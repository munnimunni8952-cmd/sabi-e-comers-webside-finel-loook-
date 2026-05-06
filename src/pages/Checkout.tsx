import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle, AlertCircle, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { saveOrder } from '../lib/supabase';
import { trackEvent } from '../services/fbPixelService';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, cartTotal, clearCart, removeFromCart, updateQuantity } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if cart is empty and not just completed
  if (cart.length === 0 && !orderComplete) {
    navigate('/shop');
    return null;
  }

  // Get single item if redirected from "Buy Now" with specific state
  // (Though for now we'll just check out the whole cart for simplicity)
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    villageName: '',
    postOffice: '',
    pinCode: '',
    district: '',
    state: '',
    fullAddress: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const orderData = {
      customer: formData,
      items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
      total: cartTotal,
      created_at: new Date().toISOString(),
    };

    try {
      const { error: supabaseError } = await saveOrder(orderData);
      if (supabaseError) throw new Error(supabaseError.message);
      
      trackEvent('Purchase', {
        content_ids: cart.map(item => item.id),
        content_type: 'product',
        value: cartTotal,
        currency: 'INR',
        num_items: cart.reduce((acc, item) => acc + item.quantity, 0)
      });

      setOrderComplete(true);
      clearCart();
    } catch (err: any) {
      setError(err.message || 'Failed to save order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-8">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex justify-center"
        >
          <div className="h-24 w-24 rounded-full bg-gold-600/20 flex items-center justify-center text-gold-400">
            <CheckCircle size={64} />
          </div>
        </motion.div>
        <div className="space-y-4">
          <h1 className="font-serif text-4xl text-white">Order Confirmed</h1>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
            Thank you for choosing Surprizo Lux. Your premium order is being processed and we will contact you shortly.
          </p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="bg-gold-600 text-luxury-black px-12 py-4 font-bold tracking-[0.2em] text-xs hover:bg-gold-500 transition-colors"
        >
          BACK TO HOME
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pb-32">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gold-600 text-[10px] font-bold tracking-widest uppercase mb-12 hover:text-gold-400 transition-colors"
      >
        <ChevronLeft size={16} /> BACK
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Form Section */}
        <div className="lg:col-span-7">
          <div className="space-y-8 mb-12">
            <h1 className="font-serif text-4xl text-white tracking-tight">Checkout</h1>
            <p className="text-gray-500 text-sm tracking-widest uppercase italic">Secure Luxury Order Placement</p>
            <div className="h-[1px] w-24 bg-gold-600" />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 p-4 mb-8 flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">Full Name</label>
                <input 
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-luxury-black border-b border-gold-900/30 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" 
                  placeholder="JULIAN DRAKE" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">Mobile Number</label>
                <input 
                  required
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  type="tel" 
                  className="w-full bg-luxury-black border-b border-gold-900/30 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" 
                  placeholder="+1 (555) 012-3456" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">Village Name</label>
                <input 
                  required
                  name="villageName"
                  value={formData.villageName}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-luxury-black border-b border-gold-900/30 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">Post Office</label>
                <input 
                  required
                  name="postOffice"
                  value={formData.postOffice}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-luxury-black border-b border-gold-900/30 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">Pin Code</label>
                <input 
                  required
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-luxury-black border-b border-gold-900/30 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">District</label>
                <input 
                  required
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-luxury-black border-b border-gold-900/30 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">State</label>
                <input 
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-luxury-black border-b border-gold-900/30 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">Full Address</label>
              <textarea 
                required
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                rows={3} 
                className="w-full bg-luxury-black border-b border-gold-900/30 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors resize-none" 
                placeholder="HOUSE NO, STREET, LANDMARK..." 
              />
            </div>

            <button 
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-gold-600 text-luxury-black py-5 font-bold tracking-[0.3em] text-xs hover:bg-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-gold-600/10"
            >
              {isSubmitting ? 'PROCESSING...' : 'CONFIRM ORDER'}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-luxury-charcoal border border-gold-900/20 p-8 space-y-8 sticky top-28">
            <h2 className="text-xs font-bold tracking-[0.2em] text-white uppercase border-b border-gold-900/10 pb-6 flex items-center gap-3">
              <ShoppingBag size={16} /> Order Overview
            </h2>

            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="h-24 w-20 bg-luxury-black shrink-0 relative overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white text-xs font-serif uppercase max-w-[150px]">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-600 hover:text-red-500 transition-colors"
                        title="Remove from order"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gold-900/40">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 px-2 text-gold-600 hover:text-gold-400 transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="px-1 text-[10px] font-bold text-white tracking-widest">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 px-2 text-gold-600 hover:text-gold-400 transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <p className="text-gold-400 text-xs font-bold tracking-widest">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gold-900/20 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-[10px] tracking-widest uppercase">Subtotal</span>
                <span className="text-white text-xs">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-gold-400">
                <span className="text-[10px] font-bold tracking-widest uppercase">Total Amount</span>
                <span className="text-lg font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
