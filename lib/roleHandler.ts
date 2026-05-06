import { UserData } from './auth'

export function getDashboardPath(role: string): string {
  switch (role) {
    case 'admin':
      return '/dashboard/admin'
    case 'resident':
      return '/dashboard/resident'
    case 'security':
      return '/dashboard/security'
    default:
      return '/dashboard'
  }
}

export function canAccessDashboard(userData: UserData | null, requiredRole: string): boolean {
  return userData?.role === requiredRole
}

export function redirectToDashboard(userData: UserData | null): string {
  if (!userData) return '/'
  return getDashboardPath(userData.role)
}