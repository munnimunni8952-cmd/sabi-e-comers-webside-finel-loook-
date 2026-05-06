import React from 'react';
import { motion } from 'motion/react';
import { Award, Gem, Globe, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
          alt="Luxury Workshop"
        />
        <div className="relative text-center space-y-6 max-w-4xl px-4">
          <span className="text-gold-400 font-bold tracking-[0.4em] text-xs uppercase">Est. 2012</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white">Redefining Modern <br /> <span className="italic gold-text">Aspirations</span></h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl text-white">Our Legacy of Excellence</h2>
            <div className="h-[1px] w-24 bg-gold-600" />
          </div>
          <div className="space-y-6 text-gray-400 leading-relaxed font-light text-lg">
            <p>
              Surprizo Lux was born from a simple yet profound vision: to bring the world's most exquisite timepieces and accessories to a global audience that values craftsmanship above all else.
            </p>
            <p>
              For over a decade, we have curated a collection that transcends mere function. Every watch, every wallet, and every fragrance in our catalog has been hand-selected for its commitment to quality, its attention to detail, and its ability to empower the individual wearing it.
            </p>
            <p>
              We don't just sell products; we facilitate experiences. We believe that a well-crafted accessory is not just an item—it's a statement of one's identity and a legacy to be passed down.
            </p>
          </div>
        </div>
        <div className="relative group">
          <div className="aspect-[4/5] overflow-hidden border border-gold-900/10 grayscale group-hover:grayscale-0 transition-all duration-1000">
            <img 
              src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800" 
              className="w-full h-full object-cover" 
              alt="Luxury Detail"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 h-64 w-64 border border-gold-600/10 -z-10" />
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-luxury-charcoal py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              { icon: <Gem size={40} />, title: "UNCOMPROMISING QUALITY", desc: "Every item undergoes rigorous authentication and quality control by our expert horologists." },
              { icon: <Globe size={40} />, title: "GLOBAL HERITAGE", desc: "Sourcing luxury from the workshops of Switzerland, Italy, and beyond to your doorstep." },
              { icon: <Award size={40} />, title: "CURATED SELECTION", desc: "We focus on exclusivity, bringing you limited editions that are rarely found elsewhere." },
              { icon: <Users size={40} />, title: "ELITE COMMUNITY", desc: "Join a network of luxury enthusiasts who share your passion for timeless design." },
            ].map((value, idx) => (
              <div key={idx} className="space-y-6 text-center">
                <div className="flex justify-center text-gold-400">
                  {value.icon}
                </div>
                <h3 className="text-[11px] font-bold tracking-[0.3em] text-white uppercase">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-12 py-12">
        <h2 className="font-serif text-4xl text-white italic">"Luxury is not a luxury. It's a way of belonging to yourself."</h2>
        <div className="space-y-4">
          <p className="text-xs font-bold tracking-[0.4em] text-gold-600 uppercase">Surprizo Lux Philosophy</p>
          <div className="h-[1px] w-12 bg-gold-600 mx-auto" />
        </div>
      </section>
    </div>
  );
};

export default About;
