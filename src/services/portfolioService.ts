import { apiFetch, type ApiResponse } from './api';

export interface PortfolioResource {
  id: number | string;
  name?: string;
  heading?: string;
  title?: string;
  tagline?: string;
  description?: string;
  image?: string;
  image_url?: string;
  alt?: string;
  location?: string;
  location_name?: string;
  link?: string | null;
  sort_order?: number;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export const portfolioService = {
  /**
   * Fetch portfolio collection from Los Colinas API
   * GET /portfolios
   */
  async getPortfolios(): Promise<ApiResponse<PortfolioResource[]>> {
    return apiFetch<PortfolioResource[]>('/portfolios');
  }
};

export default portfolioService;
