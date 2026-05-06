import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-luxury-black/90 backdrop-blur-md border-b border-gold-900/20">
      {/* Announcement Bar */}
      <div className="bg-gold-600 text-luxury-black overflow-hidden py-2 border-b border-gold-900/10">
        <div className="animate-marquee">
          {/* First set of items */}
          <span className="inline-flex items-center font-bold tracking-[0.2em] text-[10px] md:text-xs">
            {[...Array(5)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="mx-8 md:mx-16 uppercase whitespace-nowrap">Free Delivery</span>
                <span className="opacity-30">•</span>
                <span className="mx-8 md:mx-16 uppercase whitespace-nowrap">7 Days Return</span>
                <span className="opacity-30">•</span>
                <span className="mx-8 md:mx-16 uppercase whitespace-nowrap">Cash on Delivery (COD)</span>
                <span className="opacity-30">•</span>
              </React.Fragment>
            ))}
          </span>
          {/* Duplicate set of items for seamless loop */}
          <span className="inline-flex items-center font-bold tracking-[0.2em] text-[10px] md:text-xs">
            {[...Array(5)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="mx-8 md:mx-16 uppercase whitespace-nowrap">Free Delivery</span>
                <span className="opacity-30">•</span>
                <span className="mx-8 md:mx-16 uppercase whitespace-nowrap">7 Days Return</span>
                <span className="opacity-30">•</span>
                <span className="mx-8 md:mx-16 uppercase whitespace-nowrap">Cash on Delivery (COD)</span>
                <span className="opacity-30">•</span>
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-gold-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img 
            src="https://i.ibb.co/6JVKCqP5/Whats-App-Image-2026-05-03-at-9-04-40-PM.jpg" 
            alt="SURPRIZO LUX" 
            className="h-12 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `text-xs font-medium tracking-[0.1em] transition-colors hover:text-gold-400 ${
                  isActive ? 'text-gold-400 border-b border-gold-400' : 'text-gray-300'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6 text-gold-400">
          <button className="hover:text-gold-300 transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          <button className="hover:text-gold-300 transition-colors">
            <User size={20} />
          </button>
          <button className="hover:text-gold-300 transition-colors hidden sm:block">
            <Heart size={20} />
          </button>
          <Link to="/cart" className="relative hover:text-gold-300 transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-600 text-luxury-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-luxury-charcoal"
          >
            <div className="flex flex-col p-8 gap-6 items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium tracking-[0.2em] text-gray-300 hover:text-gold-400 transition-colors"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
