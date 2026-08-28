import { apiFetch, type ApiResponse } from './api';

export interface StoreJobApplicationPayload {
  full_name: string;
  email: string;
  job_title: string;
  message?: string;
  opportunity_id?: number | string;
  resume?: File | null;
}

export const jobApplicationService = {
  /**
   * Submit job application to Los Colinas API
   * POST /job-applications
   */
  async storeJobApplication(payload: StoreJobApplicationPayload | FormData): Promise<ApiResponse> {
    let body: BodyInit;
    let headers: Record<string, string> = {};

    if (payload instanceof FormData) {
      body = payload;
    } else {
      // If a File is present in object payload, construct FormData
      if (payload.resume && payload.resume instanceof File) {
        const formData = new FormData();
        formData.append('name', payload.full_name);
        formData.append('full_name', payload.full_name);
        formData.append('email', payload.email);
        formData.append('job_title', payload.job_title);
        formData.append('title', payload.job_title);
        formData.append('position', payload.job_title);
        if (payload.message) {
          formData.append('message', payload.message);
          formData.append('cover_letter', payload.message);
        }
        if (payload.opportunity_id) {
          formData.append('opportunity_id', String(payload.opportunity_id));
          formData.append('opportunity', String(payload.opportunity_id));
        }
        formData.append('resume', payload.resume);
        formData.append('file', payload.resume);
        body = formData;
      } else {
        const jsonBody = {
          ...payload,
          name: payload.full_name,
          full_name: payload.full_name,
          title: payload.job_title,
          position: payload.job_title,
          ...(payload.message ? { cover_letter: payload.message } : {}),
          ...(payload.opportunity_id ? { opportunity: payload.opportunity_id } : {}),
        };
        body = JSON.stringify(jsonBody);
        headers['Content-Type'] = 'application/json';
      }
    }

    return apiFetch('/job-applications', {
      method: 'POST',
      body,
      headers,
    });
  }
};

export default jobApplicationService;
