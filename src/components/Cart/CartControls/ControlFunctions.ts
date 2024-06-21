import { CartItem } from '../../../types/cartItem'
import { auth } from '../../../utils/firebase'
import { addItemToFirestoreCart } from './addItemToCart'
import { getFirestoreCartItems } from './getCartItems'
import {
  addItemToLocalStorageCart,
  getLocalStorageCartItems,
  removeItemFromLocalStorageCart,
} from './localStorageCart'
import { removeItemFromFirestoreCart } from './removeItemFronCart'

export const addItemToCart = async (item: CartItem) => {
  if (auth.currentUser) {
    await addItemToFirestoreCart(item)
  } else {
    addItemToLocalStorageCart(item)
  }
}

export const removeItemFromCart = async (itemId: number) => {
  if (auth.currentUser) {
    await removeItemFromFirestoreCart(itemId)
  } else {
    removeItemFromLocalStorageCart(itemId)
  }
}

export const getCartItems = async (): Promise<CartItem[]> => {
  if (auth.currentUser) {
    return await getFirestoreCartItems()
  } else {
    return getLocalStorageCartItems()
  }
}
