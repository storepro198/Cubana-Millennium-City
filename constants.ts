import { Hotspot, GalleryItem } from './types';

export const ESTATE_NAME = "Cubana Millennium City";
export const TAGLINE = "Where Legacy Meets Luxury";

export const CURRENCY_RATES = {
  NGN: 1,
  USD: 0.000625, // Approx 1600 NGN = 1 USD
  GBP: 0.00049,  // Approx 2040 NGN = 1 GBP
};

// CENTRALIZED ASSET CONFIGURATION
export const ASSETS = {
  // Switched to reliable direct video hosting to ensure autoplay works without bandwidth/scanning blocks
  // Hero Video: Aerial view of luxury estate/city at night
  HERO_VIDEO: "https://videos.pexels.com/video-files/5341206/5341206-uhd_2560_1440_25fps.mp4", 
  HERO_FALLBACK_IMAGE: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop",
  
  // IMAGES: Using Thumbnail API for Google Drive images
  VISION_IMAGE: "https://drive.google.com/thumbnail?id=1rOIkfrsfMh-CgUZJ-H_zKv8Befh4-J5k&sz=w1920",
  VISION_FALLBACK_IMAGE: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  
  // Updated Masterplan to use the specific "Estate Overview" image provided
  MASTERPLAN_MAP: "https://drive.google.com/thumbnail?id=1JfX2tHglBuxDXE60mUVGOqK-iir1VACO&sz=w1920",
  
  GALLERY: [
    { 
      type: 'video',
      // Google Drive Link for External Viewing
      src: "https://drive.google.com/file/d/1_kDTHl5GFpLD76j5BdypKTICuNYakR0A/view?usp=drivesdk", 
      title: "Site Progress Live" 
    },
    { 
      type: 'image',
      src: "https://drive.google.com/thumbnail?id=1vhM6AevT2v67wRFLBxG8nZpI-3k68jWu&sz=w1920", 
      title: "Architectural Masterpiece" 
    },
    { 
      type: 'image',
      src: "https://drive.google.com/thumbnail?id=1JfX2tHglBuxDXE60mUVGOqK-iir1VACO&sz=w1920", 
      title: "Estate Overview" 
    },
    { 
      type: 'image',
      src: "https://drive.google.com/thumbnail?id=1kJVa6IAacH6Drf2XOpCEJdz3IRPTmWWN&sz=w1920", 
      title: "Luxury Residential" 
    },
    { 
      type: 'image',
      src: "https://drive.google.com/thumbnail?id=17xlNSk6X3LX4Vf6N9Ixq1yeUqdHIDUxE&sz=w1920", 
      title: "Commercial Boulevard" 
    },
    { 
      type: 'image',
      src: "https://drive.google.com/thumbnail?id=1VPemaXOLmQCXvYbNJepENLbWtrWlzeGI&sz=w1920", 
      title: "Green Spaces" 
    },
    { 
      type: 'image',
      src: "https://drive.google.com/thumbnail?id=1FrStC0SlEFunHAvVLlNcYyfgmnuhGIQb&sz=w1920", 
      title: "Modern Infrastructure" 
    },
     { 
      type: 'image',
      src: "https://drive.google.com/thumbnail?id=1mOLFrgniNOcD0mLtn1I4uyJascntTHja&sz=w1920", 
      title: "Future Living" 
    },
  ] as GalleryItem[]
};

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'gate',
    x: 50,
    y: 85,
    title: 'Monstrous City Gate',
    status: 'Available',
    description: 'The iconic entrance to luxury. 24/7 high-tech security access control.',
    price: 'N/A'
  },
  {
    id: 'residential-a',
    x: 25,
    y: 40,
    title: 'Residential Cluster A',
    status: 'Selling Fast',
    description: 'Premium plots available in 258sqm, 315sqm, and 560sqm configurations.',
    price: 'From ₦37M'
  },
  {
    id: 'commercial',
    x: 75,
    y: 50,
    title: 'Commercial Hub',
    status: 'Future Phase',
    description: 'The future business district of Asaba. High-rise capable zones.',
    price: 'From ₦150M'
  },
  {
    id: 'school',
    x: 20,
    y: 20,
    title: 'International Academy',
    status: 'Sold Out',
    description: 'World-class educational facility site.',
    price: 'Sold Out'
  }
];

export const GALLERY_IMAGES = ASSETS.GALLERY;