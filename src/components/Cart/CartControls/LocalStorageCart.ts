import { CartItem } from '../../../types/cartItem'

const CART_KEY = 'user_cart'

const getCartFromLocalStorage = (): CartItem[] => {
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export const addItemToLocalStorageCart = (item: CartItem) => {
  const cart = getCartFromLocalStorage()
  const existingItem = cart.find((cartItem) => cartItem.id === item.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...item, quantity: 1 })
  }

  saveCartToLocalStorage(cart)
}

export const removeItemFromLocalStorageCart = (itemId: number) => {
  let cart = getCartFromLocalStorage()
  const existingItem = cart.find((item) => item.id === itemId)

  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1
    } else {
      cart = cart.filter((item) => item.id !== itemId)
    }
  }

  saveCartToLocalStorage(cart)
}

export const getLocalStorageCartItems = (): CartItem[] => {
  return getCartFromLocalStorage()
}

export const clearLocalStorageCart = () => {
  localStorage.removeItem(CART_KEY)
}
