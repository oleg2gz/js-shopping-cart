import {addItemToCart} from './cart/cart-add'
import {getCartQty} from './cart/cart-total'

export const mainCart = (itemsList) => {
  const cartQtyBlock = document.querySelector('[data-cart-qty]')
  let cart = JSON.parse(localStorage.getItem('cart-items')) || []

  const addItemClick = (e) => {
    e.preventDefault()

    if (!e.target.closest('[data-cart-add]')) return

    const item = e.target.closest('[data-item-id]')
    const {itemId} = item.dataset
    addItemToCart(cart, itemId)
  }

  const storageEventHandler = (e) => {
    if (e.key !== 'cart-items') return

    cart = JSON.parse(localStorage.getItem('cart-items'))
    cartQtyBlock.textContent = getCartQty(cart)
  }

  if (itemsList) {
    itemsList.addEventListener('click', addItemClick)
  }

  window.addEventListener('storage', storageEventHandler)

  cartQtyBlock.textContent = getCartQty(cart)
}
