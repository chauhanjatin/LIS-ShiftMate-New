// This is a stub for the future API client (e.g., Axios).
// A backend developer can easily replace this with an actual axios instance.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Example generic fetcher that can be swapped for Axios.
 */
export const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    // Stub implementation
    console.log(`GET ${API_BASE_URL}${url}`);
    return {} as T;
  },
  post: async <T>(url: string, data: any): Promise<T> => {
    // Stub implementation
    console.log(`POST ${API_BASE_URL}${url}`, data);
    return {} as T;
  },
  put: async <T>(url: string, data: any): Promise<T> => {
    // Stub implementation
    console.log(`PUT ${API_BASE_URL}${url}`, data);
    return {} as T;
  },
  delete: async <T>(url: string): Promise<T> => {
    // Stub implementation
    console.log(`DELETE ${API_BASE_URL}${url}`);
    return {} as T;
  }
};
