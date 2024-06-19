import { CartItem } from '../../../models/ICartItem'
import { auth } from '../../Login/firebase'
import { addItemToFirestoreCart } from './AddItemToCart'
import { getFirestoreCartItems } from './GetCartItems'
import {
  addItemToLocalStorageCart,
  getLocalStorageCartItems,
  removeItemFromLocalStorageCart,
} from './LocalStorageCart'
import { removeItemFromFirestoreCart } from './RemoveItemFronCart'

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
