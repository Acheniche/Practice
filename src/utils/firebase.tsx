import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDjRR51p2wa-gFLIzVnPMU0E-S9iP9h7UU',
  authDomain: 'modsen-shop.firebaseapp.com',
  projectId: 'modsen-shop',
  storageBucket: 'modsen-shop.appspot.com',
  messagingSenderId: '245570634146',
  appId: '1:245570634146:web:0e60d0a08673330b7bb2fb',
  measurementId: 'G-NYJ8S5HNXD',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    if (err instanceof Error) {
      alert(err.message)
    }
  }
}

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    })
  } catch (err) {
    console.error(err)
    if (err instanceof Error) {
      alert(err.message)
    }
  }
}

const logout = () => {
  signOut(auth)
}

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
}
