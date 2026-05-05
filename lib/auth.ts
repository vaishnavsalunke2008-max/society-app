export function getUserRole(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userRole')
  }
  return null
}

export function isAdmin(): boolean {
  return getUserRole() === 'admin'
}

export function isSecurity(): boolean {
  return getUserRole() === 'security'
}