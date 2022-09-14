import {getCartQty, getCartTotal} from './cart-total'

export const cartUpdate = (cart) => {
  const cartQtyBlock = document.querySelector('[data-cart-qty]')
  const cartTotalBlock = document.querySelector('[data-cart-total]')

  cartQtyBlock.textContent = getCartQty(cart)

  if (cartTotalBlock) {
    cartTotalBlock.textContent = `$${getCartTotal(cart)}`
  }
}
