export interface PortfolioCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  location?: string;
}

export interface Property {
  id: string;
  name: string;
  category: string; // references category ID
  location: string;
  image: string;
  gallery?: string[];
  overview: string;
  highlights: string[];
  role: string;
  performance?: {
    occupancy?: string;
    revpar?: string;
    adr?: string;
    rooms?: number;
    investmentValue?: string;
  };
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: 'premium-branded',
    name: 'LUXURY RESORTS',
    tagline: 'Global Standards. Elevated Execution.',
    description: 'Management and optimization of leading upscale hotel brands, combining global franchise support with localized operational discipline to maximize asset value.',
    image: '/images/portfolio-branded.jpg',
    alt: 'Luxury upscale branded hotel lobby and reception',
    location: 'Dallas, TX, USA'
  },
  {
    id: 'select-service',
    name: 'BUSINESS HOTELS',
    tagline: 'Efficient Operations. Stronger Yields.',
    description: 'High-performance select-service properties operating with refined cost structures and optimized labor models to deliver superior cash flows.',
    image: '/images/portfolio-select.jpg',
    alt: 'Modern sleek select-service hotel exterior',
    location: 'Miami, FL, USA'
  },
  {
    id: 'extended-stay',
    name: 'BOUTIQUE HOTELS',
    tagline: 'Residential Comfort. Premium Margins.',
    description: 'Long-term stay properties featuring specialized operational models designed to capture stable, high-margin extended-stay demand.',
    image: '/images/portfolio-extended.jpg',
    alt: 'Refined upscale extended-stay kitchen and living room suite',
    location: 'Austin, TX, USA'
  },
  {
    id: 'boutique',
    name: 'URBAN HOSPITALITY',
    tagline: 'Curation. Character. Outstanding Value.',
    description: 'Distinctive, design-forward lifestyle properties operating under independent or soft-brand systems, catering to premium-tier experiential travelers.',
    image: '/images/portfolio-boutique.jpg',
    alt: 'Curated boutique hotel lounge with high ceilings and fireplace',
    location: 'Scottsdale, AZ, USA'
  },
  {
    id: 'premium-resorts',
    name: 'PREMIUM RESORTS',
    tagline: 'Luxury Redefined. Exceptional Locations.',
    description: 'Upscale independent resorts in premier destinations managed to achieve superior guest satisfaction and outstanding investment yields.',
    image: '/images/portfolio-independent.jpg',
    alt: 'Bespoke independent luxury villa resort looking over water',
    location: 'Orlando, FL, USA'
  },
  {
    id: 'heritage',
    name: 'HERITAGE HOSPITALITY',
    tagline: 'Timeless Elegance. Curation of Culture.',
    description: 'Distinctive historic properties operated with meticulous care to preserve cultural character while delivering modern luxury services.',
    image: '/images/portfolio-featured.jpg',
    alt: 'Historic palace hotel courtyard and garden',
    location: 'San Diego, CA, USA'
  },
  {
    id: 'destination',
    name: 'DESTINATION HOTELS',
    tagline: 'Experiential Travel. Boundless Comfort.',
    description: 'Unique boutique hotels offering immersive local experiences, luxury amenities, and complete operational focus.',
    image: '/images/about-hotel.jpg',
    alt: 'Beautiful resort pool overlooking local scenery',
    location: 'Nashville, TN, USA'
  },
  {
    id: 'premium-assets',
    name: 'PREMIUM HOSPITALITY ASSETS',
    tagline: 'Institutional Quality. Strategic Growth.',
    description: 'High-value hospitality assets positioned in high-barrier urban markets to secure stable, long-term capital appreciation.',
    image: '/images/cta-hotel-night.jpg',
    alt: 'Modern high-rise hotel exterior at night',
    location: 'Denver, CO, USA'
  },
  {
    id: 'executive-apartments',
    name: 'EXECUTIVE APARTMENTS',
    tagline: 'Luxury Long-Stay. Premium Yields.',
    description: 'Corporate serviced apartments offering high-end amenities and residential hospitality services in primary business hubs.',
    image: '/images/story-01.jpg',
    alt: 'Luxury corporate apartment interior lounge',
    location: 'Chicago, IL, USA'
  },
  {
    id: 'airport-business',
    name: 'AIRPORT BUSINESS HOTELS',
    tagline: 'Transit Convenience. Exceptional Standards.',
    description: 'Premium transit hotels serving international hubs with efficient logistics, meeting spaces, and dining solutions.',
    image: '/images/story-02.jpg',
    alt: 'Modern airport business hotel reception lounge',
    location: 'Houston, TX, USA'
  }
];


export const properties: Property[] = [
 
];
