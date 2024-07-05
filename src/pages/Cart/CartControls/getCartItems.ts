import { doc, getDoc } from 'firebase/firestore'

import { CartItem } from '../../../types/cartItem'
import { auth, db } from '../../../utils/firebase'

export const getFirestoreCartItems = async (): Promise<CartItem[]> => {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error('User not authenticated')
    }

    const cartRef = doc(db, 'carts', user.uid)
    const cartDoc = await getDoc(cartRef)

    if (cartDoc.exists()) {
      const cartData = cartDoc.data()
      return cartData.items
    } else {
      return []
    }
  } catch (error) {
    console.error('Error getting cart items:', error)
    return []
  }
}
