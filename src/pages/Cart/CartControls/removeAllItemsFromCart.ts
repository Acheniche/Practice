import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { CartItem } from '../../../types/cartItem'
import { auth, db } from '../../../utils/firebase'

export const removeAllItemsFromFirestoreCart = async (itemId: number) => {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error('User not authenticated')
    }

    const cartRef = doc(db, 'carts', user.uid)
    const cartDoc = await getDoc(cartRef)

    if (cartDoc.exists()) {
      const cartData = cartDoc.data()
      const updatedItems = cartData.items.filter(
        (item: CartItem) => item.id !== itemId
      )
      await updateDoc(cartRef, { items: updatedItems })
    }
  } catch (error) {
    console.error('Error removing all items from cart:', error)
  }
}
