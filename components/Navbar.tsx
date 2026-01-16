import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Vision', href: '#vision' },
    { label: 'Map', href: '#masterplan' },
    { label: 'Invest', href: '#invest' },
  ];

  // Custom scroll handler to prevent default anchor behavior which causes iframe issues
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-obsidian/90 backdrop-blur-md py-4 border-b border-gold/20' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Area - Links to top */}
        <a 
            href="#" 
            onClick={(e) => handleNavClick(e, '#')}
            className="flex flex-col z-50 relative group"
        >
          <span className="text-2xl font-serif text-white tracking-widest font-bold group-hover:text-gold transition-colors">CUBANA</span>
          <span className="text-[0.6rem] text-gold uppercase tracking-[0.3em] group-hover:text-white transition-colors">Millennium City</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-gold transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-6 py-2 border border-gold text-gold text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-obsidian transition-all duration-300"
          >
            Request Access
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-obsidian z-40 flex flex-col items-center justify-center space-y-8 md:hidden h-screen"
          >
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-serif text-white hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-2xl font-serif text-gold hover:text-white transition-colors"
            >
              Contact Us
            </a>
            
            <div className="absolute bottom-10 text-xs text-gray-500 uppercase tracking-widest">
              Where Legacy Meets Luxury
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
