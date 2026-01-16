import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Masterplan from './components/Masterplan';
import EstateCalculator from './components/EstateCalculator';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Concierge from './components/Concierge';

function App() {
  return (
    <div className="bg-obsidian min-h-screen text-white font-sans selection:bg-gold selection:text-obsidian">
      <Navbar />
      <Hero />
      <Vision />
      <Masterplan />
      <EstateCalculator />
      <Gallery />
      <Footer />
      <Concierge />
    </div>
  );
}

export default App;