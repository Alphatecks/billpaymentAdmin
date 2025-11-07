export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
}

export const SUPABASE_CONFIG = {
  ADMIN_LOGIN_URL:
    'https://ldbxuhqjrszoicoumlpz.supabase.co/functions/v1/admin-login',
  ANON_KEY:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkYnh1aHFqcnN6b2ljb3VtbHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMzUyODYsImV4cCI6MjA3NjYxMTI4Nn0.B6xVJ-zzZX2BiI4WfMu8CkfG5uJ-6wGFoiQg-ULdUp8',
}

