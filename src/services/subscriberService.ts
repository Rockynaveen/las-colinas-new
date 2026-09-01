import { apiFetch, type ApiResponse } from './api';

export interface SubscriberPayload {
  email: string;
}

export const subscriberService = {
  /**
   * Subscribe email to newsletter/insights
   * POST /subscribers
   */
  async subscribe(email: string): Promise<ApiResponse> {
    return apiFetch('/subscribers', {
      method: 'POST',
      body: JSON.stringify({
        email: email.trim(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export default subscriberService;
