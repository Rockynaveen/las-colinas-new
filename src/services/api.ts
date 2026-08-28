export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  status: number;
  success: boolean;
}

export const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string') {
    return envUrl.replace(/\/+$/, '');
  }
  return 'http://localhost:8000/api';
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // Do not set Content-Type header if body is FormData (browser auto-sets boundary)
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const status = response.status;
    let responseData: any = null;

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      try {
        responseData = JSON.parse(text);
      } catch {
        responseData = { message: text };
      }
    }

    if (!response.ok) {
      let errorMessage = responseData?.message || `Request failed with status ${status}`;
      if (status === 422 && responseData?.errors) {
        const firstErrorKey = Object.keys(responseData.errors)[0];
        if (firstErrorKey && responseData.errors[firstErrorKey]?.[0]) {
          errorMessage = responseData.errors[firstErrorKey][0];
        }
      } else if (status === 404) {
        errorMessage = 'Requested resource not found (404).';
      } else if (status === 500) {
        errorMessage = 'Internal server error (500). Please try again later.';
      } else if (status === 401 || status === 403) {
        errorMessage = 'Access denied or unauthorized (401/403).';
      }

      console.error(`[API Error ${status}] ${options.method || 'GET'} ${url}:`, responseData);

      return {
        success: false,
        status,
        message: errorMessage,
        errors: responseData?.errors,
        data: responseData?.data !== undefined ? responseData.data : responseData,
      };
    }

    // Unwrap Laravel API Resource payload `{ data: ... }` if present
    const data = responseData?.data !== undefined ? responseData.data : responseData;

    return {
      success: true,
      status,
      message: responseData?.message || 'Success',
      data,
    };
  } catch (error: any) {
    console.error(`[API Network Error] ${options.method || 'GET'} ${url}:`, error);
    return {
      success: false,
      status: 0,
      message: error?.message || 'Network connection error. Please verify backend server availability.',
    };
  }
}
