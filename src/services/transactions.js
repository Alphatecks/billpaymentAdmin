import { SUPABASE_CONFIG } from '../config/api'

const BASE_URL = 'https://ldbxuhqjrszoicoumlpz.supabase.co/functions/v1'

const HEADERS = (token) => {
  if (!token) {
    throw new Error('Missing admin session token')
  }

  return {
    apikey: SUPABASE_CONFIG.ANON_KEY,
    Authorization: `Bearer ${SUPABASE_CONFIG.ANON_KEY}`,
    'X-Admin-Session': token,
    'Content-Type': 'application/json',
  }
}

export async function fetchTransactionFilters(token) {
  const response = await fetch(`${BASE_URL}/admin-transactions/filters`, {
    method: 'GET',
    headers: HEADERS(token),
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (payload?.success) {
    return payload.data
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error('Supabase transaction filters error', response.status, payload)
  }

  throw new Error(payload?.message || 'Unable to load transaction filters')
}

export async function fetchTransactions(token, params = {}) {
  const { page = 1, limit = 25, ...rest } = params
  const url = new URL(`${BASE_URL}/admin-transactions`)
  url.searchParams.set('page', String(page))
  url.searchParams.set('limit', String(limit))

  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: HEADERS(token),
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (payload?.success) {
    return payload.data
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error('Supabase transactions list error', response.status, payload)
  }

  throw new Error(payload?.message || 'Unable to load transactions')
}
