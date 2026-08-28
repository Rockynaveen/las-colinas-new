export interface PortfolioCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  location?: string;
  link?: string;
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

export const portfolioCategories: PortfolioCategory[] = [];

export const properties: Property[] = [];

