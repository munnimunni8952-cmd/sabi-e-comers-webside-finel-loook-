import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Truck, ShieldCheck, RotateCcw, Headset, ArrowRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2000" 
            alt="Premium Watch" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl space-y-6"
          >
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-12 bg-gold-400" />
              <span className="text-gold-400 font-bold tracking-[0.4em] text-xs uppercase">Premium Collection</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] tracking-tight">
              MAKE EVERY <br />
              <span className="italic gold-text">MOMENT</span> PREMIUM
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed font-light">
              Discover the art of elegance with our exclusive selection of luxury timepieces and sophisticated accessories.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Link 
                to="/shop" 
                className="bg-gold-600 text-luxury-black px-10 py-4 font-bold tracking-[0.2em] text-xs hover:bg-gold-500 transition-all transform hover:-translate-y-1"
              >
                SHOP NOW
              </Link>
              <Link 
                to="/collections" 
                className="border border-white/20 text-white px-10 py-4 font-bold tracking-[0.2em] text-xs hover:bg-white hover:text-luxury-black transition-all transform hover:-translate-y-1"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Carousel indicators (visual only for now) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-1 w-12 transition-all ${i === 1 ? 'bg-gold-600 w-20' : 'bg-white/20'}`} 
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-gold-900/10">
          {[
            { icon: <Truck size={32} />, title: "FREE SHIPPING", sub: "Worldwide Orders" },
            { icon: <ShieldCheck size={32} />, title: "PREMIUM QUALITY", sub: "100% Original Products" },
            { icon: <RotateCcw size={32} />, title: "EASY RETURNS", sub: "30 Days Money Back" },
            { icon: <Headset size={32} />, title: "SECURE PAYMENT", sub: "100% Protected" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-3 group">
              <div className="text-gold-400 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-[11px] font-bold tracking-[0.2em] text-white uppercase">{item.title}</h3>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Sections */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative h-[400px] group overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=800" 
            className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-luxury-black/50 group-hover:bg-luxury-black/30 transition-all" />
          <div className="relative h-full p-10 flex flex-col justify-end space-y-4">
            <h3 className="font-serif text-3xl md:text-4xl text-white">Latest Watches <br />For You</h3>
            <Link to="/shop" className="flex items-center gap-3 text-gold-400 font-bold tracking-widest text-[11px] group/btn">
              DISCOVER NOW <ArrowRight size={16} className="transform group-hover/btn:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="relative h-[400px] group overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800" 
            className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-luxury-black/50 group-hover:bg-luxury-black/30 transition-all" />
          <div className="relative h-full p-10 flex flex-col justify-end space-y-4">
            <div className="bg-gold-600 text-luxury-black px-4 py-1 self-start text-[10px] font-bold tracking-widest">LIMITED TIME</div>
            <h3 className="font-serif text-3xl md:text-4xl text-white">UP TO 30% OFF <br />Selected Sunglasses</h3>
            <Link to="/shop" className="flex items-center gap-3 text-gold-400 font-bold tracking-widest text-[11px] group/btn">
              SHOP THE SALE <ArrowRight size={16} className="transform group-hover/btn:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-24 border-t border-gold-900/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center text-center mb-20 space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-6 bg-gold-600" />
              <span className="text-gold-600 font-bold tracking-[0.4em] text-[10px] uppercase">Curated Collections</span>
              <span className="h-[1px] w-6 bg-gold-600" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">Our Categories</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed font-light">
              Explore our handpicked selection of luxury accessories designed for the modern connoisseur.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-16 md:gap-x-12">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-8 bg-gold-600" />
              <span className="text-gold-600 font-bold tracking-[0.4em] text-[10px] uppercase">Highly Coveted</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight italic">Trending Now</h2>
          </div>
          <Link 
            to="/shop" 
            className="text-white text-xs font-bold tracking-[0.2em] border-b border-gold-600 pb-1 hover:text-gold-400 transition-colors"
          >
            VIEW ALL TRENDING
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {PRODUCTS.filter(p => p.isTrending).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Value Propositions */}
      <section className="bg-luxury-charcoal py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { title: "EXCLUSIVE PRODUCTS", desc: "Handpicked luxury items from world-renowned master craftsmen." },
            { title: "AFFORDABLE LUXURY", desc: "Premium quality guaranteed at the best possible market price." },
            { title: "24/7 SUPPORT", desc: "Dedicated concierge service ready to assist you any time of day." },
            { title: "100% SATISFACTION", desc: "Your experience is our top priority. 30-day money back guarantee." },
          ].map((item, idx) => (
            <div key={idx} className="space-y-4 text-center md:text-left">
              <h3 className="text-gold-400 font-bold tracking-[0.2em] text-xs uppercase">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter (Optional here as it's in footer, but following design tropes) */}
      <section className="max-w-3xl mx-auto px-4 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl text-white italic">Join the Elite</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Register your email to receive exclusive access to limited edition drops, <br className="hidden md:block" /> private sales events, and luxury lifestyle insights.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input 
            type="email" 
            placeholder="EMAIL ADDRESS" 
            className="flex-grow bg-luxury-charcoal border border-gold-900/30 px-6 py-4 text-xs tracking-widest focus:outline-none focus:border-gold-400 transition-colors"
          />
          <button className="bg-gold-600 text-luxury-black px-10 py-4 font-bold tracking-[0.2em] text-xs hover:bg-gold-500 transition-colors">
            JOIN LUXE
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
