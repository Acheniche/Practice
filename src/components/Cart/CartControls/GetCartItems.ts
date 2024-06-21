import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../../utils/firebase'
import { CartItem } from '../../../types/cartItem'

export const getFirestoreCartItems = async (): Promise<CartItem[]> => {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error('User not authenticated')
    }

    const cartRef = doc(db, 'carts', user.uid)
    console.log('Fetching cart items for user:', user.uid)
    const cartDoc = await getDoc(cartRef)

    if (cartDoc.exists()) {
      const cartData = cartDoc.data()
      console.log('Cart items:', cartData.items)
      return cartData.items
    } else {
      console.log('No cart found for user')
      return []
    }
  } catch (error) {
    console.error('Error getting cart items:', error)
    return []
  }
}
