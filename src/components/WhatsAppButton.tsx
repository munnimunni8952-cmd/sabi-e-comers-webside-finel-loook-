import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '1234567890'; // Replace with actual support number
  const message = 'Hello Surprizo Lux! I would like to inquire about your luxury collection.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      id="whatsapp-floater"
    >
      <div className="absolute -left-32 bg-luxury-black border border-gold-900/20 text-white text-[10px] py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-widest font-bold whitespace-nowrap">
        CHAT WITH SUPPORT
      </div>
      <MessageCircle size={24} fill="currentColor" />
      
      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10" />
    </motion.a>
  );
};

export default WhatsAppButton;
