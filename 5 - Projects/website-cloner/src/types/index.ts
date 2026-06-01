export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  href: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
