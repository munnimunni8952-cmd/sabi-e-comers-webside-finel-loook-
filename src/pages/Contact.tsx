import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pb-32">
      <div className="text-center mb-24 space-y-4">
        <h1 className="font-serif text-5xl text-white tracking-tight">Contact Us</h1>
        <div className="h-[1px] w-24 bg-gold-600 mx-auto" />
        <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
          Our VIP concierge team is at your service. Whether it's a product inquiry or a special commission, we're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-12">
            {[
              { icon: <Mail size={24} />, title: "EMAIL US", sub: "concierge@surprizolux.com", desc: "Available 24/7 for your inquiries" },
              { icon: <Phone size={24} />, title: "CALL US", sub: "+1 (800) LUX-LIFE", desc: "Mon - Fri, 9am - 6pm EST" },
              { icon: <MapPin size={24} />, title: "FIND US", sub: "5th Avenue, New York", desc: "Our flagship showroom location" },
              { icon: <Clock size={24} />, title: "HOURS", sub: "Luxury Never Sleeps", desc: "Online concierge active around the clock" },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="h-12 w-12 rounded-full border border-gold-900/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-600 group-hover:text-luxury-black transition-all shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">{item.title}</h3>
                  <p className="text-white text-lg font-serif">{item.sub}</p>
                  <p className="text-gray-500 text-xs tracking-widest uppercase">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-luxury-charcoal border border-gold-900/10 p-10 md:p-16"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">First Name</label>
                  <input type="text" className="w-full bg-luxury-black border-b border-gold-900/30 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" placeholder="JULIAN" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">Last Name</label>
                  <input type="text" className="w-full bg-luxury-black border-b border-gold-900/30 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" placeholder="DRAKE" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">Email Address</label>
                <input type="email" className="w-full bg-luxury-black border-b border-gold-900/30 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" placeholder="JULIAN@THEELITE.COM" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">Your Message</label>
                <textarea rows={4} className="w-full bg-luxury-black border-b border-gold-900/30 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors resize-none" placeholder="HOW CAN WE ASSIST YOU TODAY?"></textarea>
              </div>

              <button className="w-full bg-gold-600 text-luxury-black py-5 font-bold tracking-[0.3em] text-xs hover:bg-gold-500 transition-all flex items-center justify-center gap-3 group">
                SEND MESSAGE <Send size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
