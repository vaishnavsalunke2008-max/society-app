import { User } from '@supabase/supabase-js'
import { supabase } from './supabase'

export type UserRole = 'admin' | 'resident' | 'security'

export interface UserData {
  uid: string
  email: string
  role: UserRole
}

const ADMIN_INVITE_CODE = 'ADMIN2024' // Simulate secure code; in production, move to backend

export async function signUp(email: string, password: string, role: UserRole, adminCode?: string): Promise<UserData> {
  if (role === 'admin' && adminCode !== ADMIN_INVITE_CODE) {
    throw new Error('Invalid admin invite code')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error
  if (!data.user) throw new Error('User creation failed')

  const user = data.user

  const userData: UserData = {
    uid: user.id,
    email: user.email!,
    role,
  }

  const { error: dbError } = await supabase
    .from('users')
    .insert([{ id: user.id, email: user.email, role }])

  if (dbError) throw dbError

  return userData
}

export async function signIn(email: string, password: string): Promise<UserData> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  if (!data.user) throw new Error('Sign in failed')

  const user = data.user

  const { data: userDoc, error: dbError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (dbError || !userDoc) {
    throw new Error('User data not found')
  }

  return {
    uid: userDoc.id,
    email: userDoc.email,
    role: userDoc.role,
  }
}

export async function logOut(): Promise<void> {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export function onAuthStateChange(callback: (user: User | null, userData: UserData | null) => void): () => void {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    const user = session?.user ?? null
    
    if (user) {
      const { data: userDoc } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
        
      if (userDoc) {
        callback(user, {
          uid: userDoc.id,
          email: userDoc.email,
          role: userDoc.role,
        })
      } else {
        callback(user, null)
      }
    } else {
      callback(null, null)
    }
  })

  return () => subscription.unsubscribe()
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
}
