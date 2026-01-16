import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../constants';

const Vision: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="vision" className="scroll-mt-28 py-24 bg-obsidian-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Visual */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
        >
            <div className="absolute -inset-4 border border-gold/30 rounded-none z-0 translate-x-4 translate-y-4"></div>
            <img 
                src={imgError ? ASSETS.VISION_FALLBACK_IMAGE : ASSETS.VISION_IMAGE}
                onError={() => setImgError(true)}
                alt="Obi Cubana Vision" 
                className="relative z-10 w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-10 left-10 z-20 bg-black/80 backdrop-blur p-4 border-l-4 border-gold">
                <p className="text-gold font-serif text-xl italic">"We are building the new Lagos in Asaba."</p>
                <p className="text-white text-xs mt-2 tracking-widest uppercase">- Obi Cubana</p>
            </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <h3 className="text-gold uppercase tracking-[0.2em] mb-4 text-sm font-semibold">The M.O.R.E Agenda</h3>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                Crafting a <span className="italic text-gold">Legacy</span> for Generations
            </h2>
            <div className="space-y-6 text-gray-400 font-light text-lg leading-relaxed">
                <p>
                    Cubana Millennium City is not just land; it is a meticulously curated ecosystem designed for the ultra-elite. 
                    Strategically located at the heart of the developing economic corridor, we are bridging the gap between luxury living and high-yield investment.
                </p>
                <p>
                    With the 2026 completion date firmly in our sights, early adopters are positioning themselves at the forefront of the largest real estate revolution in Delta State history.
                </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                    <h4 className="text-3xl text-white font-serif">2026</h4>
                    <p className="text-xs text-gold uppercase tracking-wider mt-1">Completion Target</p>
                </div>
                <div>
                    <h4 className="text-3xl text-white font-serif">100+</h4>
                    <p className="text-xs text-gold uppercase tracking-wider mt-1">Acres of Prime Land</p>
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Vision;