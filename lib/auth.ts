export function getUserRole(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userRole')
  }
  return null
}

export function isAdmin(): boolean {
  return getUserRole() === 'admin'
}

export type UserRole = 'admin' | 'resident' | 'security'

export type MockUser = {
  username: string
  password: string
  role: UserRole
  fullName: string
}

const mockUsers: MockUser[] = [
  { username: 'adminuser', password: 'admin123', role: 'admin', fullName: 'Admin User' },
  { username: 'resident1', password: 'res123', role: 'resident', fullName: 'Resident One' },
  { username: 'security1', password: 'sec123', role: 'security', fullName: 'Security Guard' },
]

export function authenticate(
  username: string,
  password: string,
  role: UserRole
): MockUser | null {
  return (
    mockUsers.find(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.role === role
    ) ?? null
  )
}

export function setUserSession(user: MockUser) {
  if (typeof window === 'undefined') return
  localStorage.setItem('userRole', user.role)
  localStorage.setItem('userName', user.username)
  localStorage.setItem('userFullName', user.fullName)
}

export function clearUserSession() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('userRole')
  localStorage.removeItem('userName')
  localStorage.removeItem('userFullName')
}

export function getUserRole(): UserRole | null {
  if (typeof window !== 'undefined') {
    const role = localStorage.getItem('userRole')
    if (role === 'admin' || role === 'resident' || role === 'security') {
      return role
    }
  }
  return null
}

export function isAdmin(): boolean {
  return getUserRole() === 'admin'
}

export function isSecurity(): boolean {
  return getUserRole() === 'security'
}
