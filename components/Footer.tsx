import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Footer: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to backend
    setTimeout(() => {
        setSubmitted(false);
    }, 5000);
  };

  return (
    <footer id="contact" className="scroll-mt-28 bg-[#050505] text-white pt-24 pb-12 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-obsidian via-gold to-obsidian"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* CTA Content */}
            <div>
                <h2 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
                    The future is here. <br/>
                    <span className="text-gold italic">Will you be part of it?</span>
                </h2>
                <p className="text-gray-400 max-w-md text-lg font-light mb-8">
                    Join the exclusive list of investors shaping the skyline of Asaba. 
                    Limited plots available in Phase 1.
                </p>
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                    <p>Sales Office: Cubana Millennium City, Asaba-Benin Expressway.</p>
                    <p>Email: exclusive@cubana-millennium.com</p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-obsidian-light p-8 md:p-10 rounded-2xl border border-gold/10 relative overflow-hidden">
                {submitted ? (
                    <div className="absolute inset-0 z-20 bg-obsidian-light flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
                        <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold mb-4">
                            <Check size={32} />
                        </div>
                        <h3 className="text-2xl font-serif text-white mb-2">Request Received</h3>
                        <p className="text-gray-400 text-sm">
                            Thank you. A Cubana Concierge will contact you shortly to confirm your exclusive access.
                        </p>
                    </div>
                ) : null}

                <h3 className="text-2xl font-serif mb-6">Request Exclusive Access</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-gold tracking-widest">Full Name</label>
                            <input required type="text" className="w-full bg-black border-b border-gray-800 focus:border-gold py-3 px-2 text-white outline-none transition-colors" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-gold tracking-widest">Phone Number</label>
                            <input required type="tel" className="w-full bg-black border-b border-gray-800 focus:border-gold py-3 px-2 text-white outline-none transition-colors" placeholder="+234..." />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase text-gold tracking-widest">Investment Budget</label>
                        <select className="w-full bg-black border-b border-gray-800 focus:border-gold py-3 px-2 text-white outline-none transition-colors appearance-none">
                            <option>₦50M - ₦100M</option>
                            <option>₦100M - ₦250M</option>
                            <option>₦250M - ₦500M</option>
                            <option>₦500M+</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-gold text-obsidian py-4 font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 mt-4">
                        Secure My Slot
                    </button>
                </form>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>&copy; 2024 Cubana Millennium City. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <span className="hover:text-gold cursor-pointer">Privacy Policy</span>
                <span className="hover:text-gold cursor-pointer">Terms of Service</span>
            </div>
        </div>
    </footer>
  );
};

export default Footer;