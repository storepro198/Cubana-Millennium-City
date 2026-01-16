import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { TAGLINE, ASSETS } from '../constants';

const Hero: React.FC = () => {
  const [videoError, setVideoError] = useState(false);

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('vision');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-obsidian">
      {/* Background Media */}
      <div className="absolute inset-0 z-0 opacity-60">
        {!videoError && ASSETS.HERO_VIDEO ? (
            <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover"
                poster={ASSETS.HERO_FALLBACK_IMAGE}
                onError={() => {
                  console.warn("Hero video failed to load. Falling back to image.");
                  setVideoError(true);
                }}
            >
                <source src={ASSETS.HERO_VIDEO} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        ) : (
            <img 
                src={ASSETS.HERO_FALLBACK_IMAGE}
                alt="Estate Aerial View" 
                className="w-full h-full object-cover"
            />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-transparent to-obsidian/90" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
            <h2 className="text-gold tracking-[0.3em] text-sm md:text-base mb-6 uppercase">
                The Future of Asaba
            </h2>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-6 leading-tight">
            {TAGLINE}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
            Experience the pinnacle of Nigerian real estate. A smart city built for the 1%.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-gold cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#vision" onClick={handleScrollDown} aria-label="Scroll to vision">
            <ChevronDown size={32} />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;