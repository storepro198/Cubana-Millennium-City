import React, { useState } from 'react';
import { ASSETS } from '../constants';
import { GalleryItem } from '../types';
import { Play } from 'lucide-react';

// Helper component to handle individual media errors
const GalleryMedia: React.FC<{ item: GalleryItem }> = ({ item }) => {
    const [error, setError] = useState(false);

    // If error, we show a generic placeholder but we ensure it matches the layout
    const fallbackImage = "https://images.unsplash.com/photo-1600596542815-27b88e542d93?q=80&w=800&auto=format&fit=crop";

    if (item.type === 'video') {
        // Special handling for Google Drive links: Link out instead of iframe to avoid X-Frame-Options errors
        if (item.src.includes('drive.google.com')) {
             return (
                <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-white/10 group-hover:border-gold/30 transition-colors group">
                     {/* Placeholder Thumbnail for the video */}
                     <img 
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop" 
                        alt={item.title}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                     />
                     
                     <a 
                        href={item.src} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center z-20 group/btn"
                     >
                        <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center text-obsidian group-hover/btn:scale-110 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                            <Play size={24} className="ml-1 fill-obsidian" />
                        </div>
                     </a>

                     <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm pointer-events-none z-10">
                        Watch Video
                    </div>
                </div>
             );
        }

        return (
            <div className="relative w-full h-auto">
                {!error ? (
                     <video
                        src={item.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            console.error("Video failed to load:", item.src);
                            setError(true);
                        }}
                    />
                ) : (
                    <img 
                        src={fallbackImage}
                        alt="Video Unavailable"
                        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110 grayscale"
                    />
                )}
                
                {/* Video Badge - show only if no error */}
                {!error && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
                        Live Video
                    </div>
                )}
            </div>
        );
    }

    return (
        <img 
            src={error ? fallbackImage : item.src} 
            alt={item.title} 
            className={`w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110 ${error ? 'grayscale opacity-50' : ''}`}
            onError={(e) => {
                console.error("Image failed to load:", item.src);
                setError(true);
            }}
        />
    );
};

const Gallery: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
            <h2 className="text-gold tracking-[0.2em] text-sm uppercase font-semibold mb-3">The Lifestyle</h2>
            <h3 className="text-4xl font-serif text-white">Visualizing Perfection</h3>
        </div>
        <a 
            href="#contact"
            onClick={(e) => handleScroll(e, 'contact')}
            className="hidden md:block text-white hover:text-gold transition-colors border-b border-gold pb-1 text-sm uppercase tracking-widest"
        >
            View All Progress
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-6 columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {ASSETS.GALLERY.map((item, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-lg break-inside-avoid">
                <GalleryMedia item={item} />
                
                {/* Only show overlay for non-iframe items (since iframes capture mouse events) */}
                {!item.src.includes('drive.google.com') && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                        <div>
                            <p className="text-gold text-xs uppercase tracking-widest mb-1">
                                {item.type === 'video' ? 'On Site' : 'Future Reality'}
                            </p>
                            <h4 className="text-white font-serif text-xl">{item.title}</h4>
                        </div>
                    </div>
                )}
            </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;