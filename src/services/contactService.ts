import { apiFetch, type ApiResponse } from './api';

export interface StoreContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactService = {
  /**
   * Send Contact Us submission to Los Colinas API
   * POST /contact
   */
  async storeContact(payload: StoreContactPayload): Promise<ApiResponse> {
    return apiFetch('/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim(),
        subject: payload.subject.trim(),
        message: payload.message.trim(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export default contactService;
