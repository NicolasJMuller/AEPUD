export interface Session {
  username: string
  roles: string[]
}

const tokenKey = 'aepud.token'

export function lireToken() {
  return sessionStorage.getItem(tokenKey)
}

export function enregistrerToken(token: string | null) {
  if (token === null) {
    sessionStorage.removeItem(tokenKey)
  } else {
    sessionStorage.setItem(tokenKey, token)
  }
}

export class ApiError extends Error {
  readonly status: number

  constructor(status: number) {
    super(`HTTP ${status}`)
    this.status = status
  }
}

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api/${path}`, {
    ...options,
    headers: { Accept: 'application/json', ...options?.headers },
  })
  if (!response.ok) {
    throw new ApiError(response.status)
  }
  return response.json() as Promise<T>
}

export function obtenirToken(username: string, password: string) {
  return api<{ token: string }>('login_check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
}

export function obtenirSession(token: string, signal?: AbortSignal) {
  return api<Session>('me', {
    headers: { Authorization: `Bearer ${token}` },
    signal,
  })
}

export function expirationToken(token: string) {
  const payload = token.split('.')[1]
  const { exp } = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as { exp: number }
  return exp * 1000
}

export function accueilSession(session: Session) {
  return session.roles.includes('ROLE_ADMIN') ? '/infoadmin' : '/'
}
