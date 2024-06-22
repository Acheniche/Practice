import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { CartItem } from '../../../types/cartItem'
import { auth, db } from '../../../utils/firebase'

export const addItemToFirestoreCart = async (item: CartItem) => {
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
        (cartItem: CartItem) => cartItem.id === item.id
      )

      if (existingItem) {
        const updatedItems = cartData.items.map((cartItem: CartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
        await updateDoc(cartRef, { items: updatedItems })
      } else {
        await updateDoc(cartRef, {
          items: arrayUnion({ ...item, quantity: 1 }),
        })
      }
    } else {
      await setDoc(cartRef, { items: [{ ...item, quantity: 1 }] })
    }
  } catch (error) {
    console.error('Error adding item to cart:', error)
  }
}
