import { SUPABASE_CONFIG } from '../config/api'

const buildHeaders = () => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  if (SUPABASE_CONFIG.ANON_KEY) {
    headers.append('apikey', SUPABASE_CONFIG.ANON_KEY)
    headers.append('Authorization', `Bearer ${SUPABASE_CONFIG.ANON_KEY}`)
  }

  return headers
}

export async function adminLogin({ email, password }) {
  const response = await fetch(SUPABASE_CONFIG.ADMIN_LOGIN_URL, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({ email, password }),
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message = isJson ? payload?.message || payload?.error : payload
    throw new Error(message || 'Unable to login admin user')
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('Supabase admin login response', payload)
  }

  return payload
}
