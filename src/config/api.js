export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
}

