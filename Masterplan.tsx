import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import { HOTSPOTS, ASSETS } from '../constants';
import { Hotspot } from '../types';

const Masterplan: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const handleInquire = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveHotspot(null);
    const element = document.getElementById('contact');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="masterplan" className="scroll-mt-28 relative w-full h-[80vh] bg-obsidian overflow-hidden">
      {/* Map Header */}
      <div className="absolute top-10 left-6 z-20 max-w-md">
         <h2 className="text-3xl font-serif text-white mb-2">Interactive Masterplan</h2>
         <p className="text-gray-400 text-sm">Explore the districts. Click the gold markers for details.</p>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden group">
        {/* Placeholder for the Map - darkened image */}
        <img 
            src={ASSETS.MASTERPLAN_MAP}
            alt="Masterplan Map" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
        />
        
        {/* Hotspots */}
        {HOTSPOTS.map((spot) => (
            <button
                key={spot.id}
                onClick={() => setActiveHotspot(spot)}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group/point"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
                <div className="relative">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                    <div className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-gold/90 text-obsidian shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-transform group-hover/point:scale-125">
                        <MapPin size={16} />
                    </div>
                </div>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/point:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                    {spot.title}
                </div>
            </button>
        ))}
      </div>

      {/* Detail Card Overlay */}
      <AnimatePresence>
        {activeHotspot && (
            <motion.div 
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-0 right-0 h-full w-full md:w-96 glass-panel z-30 p-8 flex flex-col justify-center border-l border-gold/20"
            >
                <button 
                    onClick={() => setActiveHotspot(null)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>

                <div className="mb-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
                        activeHotspot.status === 'Sold Out' ? 'bg-red-500/20 text-red-400' :
                        activeHotspot.status === 'Selling Fast' ? 'bg-gold/20 text-gold' :
                        'bg-blue-500/20 text-blue-400'
                    }`}>
                        {activeHotspot.status}
                    </span>
                </div>
                
                <h3 className="text-3xl font-serif text-white mb-4">{activeHotspot.title}</h3>
                <p className="text-gray-300 font-light leading-relaxed mb-8">
                    {activeHotspot.description}
                </p>

                <div className="border-t border-white/10 pt-6 mt-auto">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Starting Price</p>
                    <p className="text-2xl text-gold font-serif">{activeHotspot.price}</p>
                    
                    {activeHotspot.status !== 'Sold Out' && (
                        <a 
                            href="#contact"
                            className="block w-full text-center mt-6 bg-white text-obsidian py-3 font-bold uppercase text-sm tracking-widest hover:bg-gold transition-colors"
                            onClick={handleInquire}
                        >
                            Inquire Now
                        </a>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Masterplan;