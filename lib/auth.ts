import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

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

  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  const userData: UserData = {
    uid: user.uid,
    email: user.email!,
    role,
  }

  await setDoc(doc(db, 'users', user.uid), userData)

  return userData
}

export async function signIn(email: string, password: string): Promise<UserData> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  const userDoc = await getDoc(doc(db, 'users', user.uid))
  if (!userDoc.exists()) {
    throw new Error('User data not found')
  }

  return userDoc.data() as UserData
}

export async function logOut(): Promise<void> {
  await signOut(auth)
}

export function onAuthStateChange(callback: (user: User | null, userData: UserData | null) => void): () => void {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const userData = userDoc.exists() ? (userDoc.data() as UserData) : null
      callback(user, userData)
    } else {
      callback(null, null)
    }
  })
}

export function getCurrentUser(): User | null {
  return auth.currentUser
}

