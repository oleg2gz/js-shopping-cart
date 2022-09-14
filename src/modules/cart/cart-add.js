import {findItemById} from '../util/use-array'
import {cartUpdate} from './cart-total-update'

export const addItemToCart = (cart, id) => {
  let item = findItemById(cart, parseInt(id))

  if (item) {
    item.cartQty++
  } else {
    const items = JSON.parse(localStorage.getItem('all-items'))

    item = findItemById(items, parseInt(id))
    cart.push(item)
  }
  localStorage.setItem('cart-items', JSON.stringify(cart))
  cartUpdate(cart)
}
