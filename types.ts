export interface NavItem {
  label: string;
  href: string;
}

export enum Currency {
  NGN = 'NGN',
  USD = 'USD',
  GBP = 'GBP',
}

export interface Hotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: string;
  status: 'Sold Out' | 'Selling Fast' | 'Future Phase' | 'Available';
  price?: string;
  description: string;
}

export interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  title: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}