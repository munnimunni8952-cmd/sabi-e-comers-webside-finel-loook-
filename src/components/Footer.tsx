import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-luxury-charcoal border-t border-gold-900/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link to="/" className="flex flex-col">
            <img 
              src="https://i.ibb.co/6JVKCqP5/Whats-App-Image-2026-05-03-at-9-04-40-PM.jpg" 
              alt="SURPRIZO LUX" 
              className="h-12 md:h-16 w-auto object-contain self-start"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Exclusively curated luxury items for those who appreciate the finer things in life. Our collection defines elegance, precision, and timeless style.
          </p>
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 rounded-full border border-gold-900/30 flex items-center justify-center text-gold-400 hover:bg-gold-600 hover:text-luxury-black transition-all">
              <Facebook size={18} />
            </button>
            <button className="h-10 w-10 rounded-full border border-gold-900/30 flex items-center justify-center text-gold-400 hover:bg-gold-600 hover:text-luxury-black transition-all">
              <Instagram size={18} />
            </button>
            <button className="h-10 w-10 rounded-full border border-gold-900/30 flex items-center justify-center text-gold-400 hover:bg-gold-600 hover:text-luxury-black transition-all">
              <Twitter size={18} />
            </button>
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Newsletter</h3>
          <p className="text-gray-400 text-sm">Subscribe to stay updated on our latest collections and exclusive offers.</p>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="bg-luxury-black border border-gold-900/30 px-4 py-3 text-xs tracking-widest focus:outline-none focus:border-gold-400 transition-colors w-full"
            />
            <button className="bg-gold-600 text-luxury-black px-6 py-3 text-xs font-bold tracking-[0.2em] hover:bg-gold-500 transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Quick Links</h3>
          <ul className="space-y-3">
            {['Home', 'Shop', 'Collections', 'About Us', 'Contact'].map((link) => (
              <li key={link}>
                <Link to={`/${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 text-sm hover:text-gold-400 transition-colors uppercase tracking-widest text-[11px]">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Customer Service</h3>
          <ul className="space-y-3">
            {['Shipping Policy', 'Return Policy', 'Privacy Policy', 'Terms & Conditions', 'FAQ'].map((link) => (
              <li key={link}>
                <Link to="#" className="text-gray-400 text-sm hover:text-gold-400 transition-colors uppercase tracking-widest text-[11px]">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Payment & Copyright */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-gold-900/10 flex flex-col md:flex-row justify-center items-center gap-6">
        <p className="text-gray-500 text-[10px] tracking-widest text-center">
          © 2026 SURPRIZO LUX. ALL RIGHTS RESERVED. MADE BY RAJ
        </p>
      </div>
    </footer>
  );
};

export default Footer;
