import { apiFetch, type ApiResponse } from './api';

export interface OpportunityResource {
  id: number | string;
  name?: string;
  title?: string;
  location: string;
  department?: string;
  type?: string;
  description?: string;
  requirements?: string;
  icon?: string | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export const opportunityService = {
  /**
   * Fetch list of opportunities from Los Colinas API
   * GET /opportunities
   */
  async getOpportunities(): Promise<ApiResponse<OpportunityResource[]>> {
    return apiFetch<OpportunityResource[]>('/opportunities');
  }
};

export default opportunityService;
