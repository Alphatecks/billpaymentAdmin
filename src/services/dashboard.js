import { SUPABASE_CONFIG } from '../config/api'

export async function fetchDashboardOverview(token) {
  if (!token) {
    throw new Error('Missing admin session token')
  }

  const response = await fetch(
    'https://ldbxuhqjrszoicoumlpz.supabase.co/functions/v1/admin-dashboard/overview',
    {
      method: 'GET',
      headers: {
        apikey: SUPABASE_CONFIG.ANON_KEY,
        Authorization: `Bearer ${SUPABASE_CONFIG.ANON_KEY}`,
        'X-Admin-Session': token,
      },
    },
  )

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message = isJson ? payload?.message || payload?.error : payload
    throw new Error(message || 'Unable to retrieve dashboard metrics')
  }

  if (payload?.success) {
    return payload.data
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error('Supabase overview error', response.status, payload)
  }

  throw new Error(payload?.message || 'Unable to retrieve dashboard metrics')
}

export async function fetchRecentActivity(token, limit = 4) {
  if (!token) {
    throw new Error('Missing admin session token')
  }

  const url = new URL(
    'https://ldbxuhqjrszoicoumlpz.supabase.co/functions/v1/admin-dashboard/recent-activity',
  )
  url.searchParams.set('limit', String(limit))

  const response = await fetch(url.toString(), {
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

  if (!response.ok) {
    const message = isJson ? payload?.message || payload?.error : payload
    throw new Error(message || 'Unable to retrieve recent activity')
  }

  if (payload?.success) {
    return payload.data?.items ?? payload.data ?? []
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error('Supabase recent activity error', response.status, payload)
  }

  throw new Error(payload?.message || 'Unable to retrieve recent activity')
}
