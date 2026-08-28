import { apiFetch, type ApiResponse } from './api';

export interface StoreResumePayload {
  file: File;
  full_name?: string;
  email?: string;
}

export const resumeService = {
  /**
   * Upload resume to Los Colinas API
   * POST /resumes
   */
  async storeResume(payload: StoreResumePayload | FormData): Promise<ApiResponse> {
    let body: FormData;

    if (payload instanceof FormData) {
      body = payload;
    } else {
      body = new FormData();
      // Append file using 'resume' field name primary, 'file' fallback
      body.append('resume', payload.file);
      body.append('file', payload.file);
      if (payload.full_name) {
        body.append('name', payload.full_name);
        body.append('full_name', payload.full_name);
      }
      if (payload.email) body.append('email', payload.email);
    }

    return apiFetch('/resumes', {
      method: 'POST',
      body,
    });
  }
};

export default resumeService;
