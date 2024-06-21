import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../../utils/firebase'
import { CartItem } from '../../../types/cartItem'

export const removeItemFromFirestoreCart = async (itemId: number) => {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error('User not authenticated')
    }

    const cartRef = doc(db, 'carts', user.uid)
    const cartDoc = await getDoc(cartRef)

    if (cartDoc.exists()) {
      const cartData = cartDoc.data()
      const existingItem = cartData.items.find(
        (item: CartItem) => item.id === itemId
      )

      if (existingItem) {
        let updatedItems
        if (existingItem.quantity > 1) {
          updatedItems = cartData.items.map((item: CartItem) =>
            item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
          )
        } else {
          updatedItems = cartData.items.filter(
            (item: CartItem) => item.id !== itemId
          )
        }
        await updateDoc(cartRef, { items: updatedItems })
      } else {
        console.log('Item not found in cart:', itemId)
      }
    } else {
      console.log('No cart found for user')
    }

    console.log('Item removed from cart:', itemId)
  } catch (error) {
    console.error('Error removing item from cart:', error)
  }
}
