import { SUPABASE_CONFIG } from '../config/api'

const BASE_URL = 'https://ldbxuhqjrszoicoumlpz.supabase.co/functions/v1'

export async function fetchCustomers(token) {
  if (!token) {
    throw new Error('Missing admin session token')
  }

  const response = await fetch(`${BASE_URL}/admin-customers`, {
    method: 'GET',
    headers: {
      apikey: SUPABASE_CONFIG.ANON_KEY,
      Authorization: `Bearer ${SUPABASE_CONFIG.ANON_KEY}`,
      'X-Admin-Session': token,
    },
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (payload?.success) {
    return payload.data
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error('Supabase customers error', response.status, payload)
  }

  throw new Error(payload?.message || 'Unable to load customers')
}

export async function fetchCustomerById(token, customerId) {
  if (!token) {
    throw new Error('Missing admin session token')
  }

  if (!customerId) {
    throw new Error('Customer ID is required')
  }

  const response = await fetch(`${BASE_URL}/admin-customers/${customerId}`, {
    method: 'GET',
    headers: {
      apikey: SUPABASE_CONFIG.ANON_KEY,
      Authorization: `Bearer ${SUPABASE_CONFIG.ANON_KEY}`,
      'X-Admin-Session': token,
    },
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (payload?.success) {
    return payload.data
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error('Supabase customer detail error', response.status, payload)
  }

  throw new Error(payload?.message || 'Unable to load customer details')
}
