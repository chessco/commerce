import axios from 'axios';

// Create a globally configured Axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3011', // Connects directly to local NestJS
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token and TenantID automatically
api.interceptors.request.use(
  (config) => {
    // 1. Attach Auth Token
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 2. Attach Tenant ID (Assuming it's stored alongside auth or decoded from URL if needed)
    // For now, if the user is logged in, their tenantId is in their profile.
    // In a multi-tenant SaaS, you often pass x-tenant-id if the user can switch tenants,
    // but here the token inherently binds them to a tenant on the backend.
    // We can still explicitly pass it if needed by the frontend architecture.
    const tenantId = localStorage.getItem('tenant_id');
    if (tenantId) {
      config.headers['x-tenant-id'] = tenantId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Global Errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login if token expires
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
