import { doc, updateDoc } from 'firebase/firestore'

import { auth, db } from '../../../utils/firebase'

export const clearFirestoreCart = async () => {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error('User not authenticated')
    }

    const cartRef = doc(db, 'carts', user.uid)
    await updateDoc(cartRef, { items: [] })
  } catch (error) {
    console.error('Error clearing cart:', error)
  }
}
