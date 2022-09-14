import {renderItems} from '../render-items'
import {getItemTotal} from './cart-total'
import {cartUpdate} from './cart-total-update'
import {findItemById} from '../util/use-array'

export const createCart = () => {
  const cartList = document.querySelector('[data-cart-list]')
  let cart = JSON.parse(localStorage.getItem('cart-items')) || []

  const renderOneCartItemCallback = (item) => `
    <div data-item-id="${item.id}">    
      <div class="product">
        <ion-icon name="close-circle" data-cart-remove></ion-icon>
        <img src="./img/${item.img}" />
        <span>${item.name}</span>
      </div>
      <div class="price">$${item.price.toFixed(2)}</div>
      <div class="quantity">
        <ion-icon class="decrease" name="arrow-dropleft-circle" data-cart-decrease>
        </ion-icon>
        <span data-cart-item-qty>${item.cartQty}</span>
        <ion-icon class="increase" name="arrow-dropright-circle" data-cart-increase>
        </ion-icon>
      </div>
      <div class="total" data-cart-item-total>$${getItemTotal(
        item.price,
        item.cartQty
      )}</div>
    </div>`

  const cartChangeQty = (e) => {
    const target = e.target

    if (
      !target.closest(
        '[data-cart-remove], [data-cart-decrease], [data-cart-increase]'
      )
    )
      return

    const itemElement = target.closest('[data-item-id]')
    const {itemId} = itemElement.dataset
    const item = findItemById(cart, parseInt(itemId))
    const itemQtyBlock = itemElement.querySelector('[data-cart-item-qty]')
    const itemTotalBlock = itemElement.querySelector('[data-cart-item-total]')

    const updateCartItemDisplay = (item) => {
      itemQtyBlock.textContent = `${item.cartQty}`
      itemTotalBlock.textContent = `$${getItemTotal(item.cartQty, item.price)}`
    }

    if (target.closest('[data-cart-remove]')) {
      itemElement.remove()
      cart = cart.filter((item) => item.id !== parseInt(itemId))
    }
    if (target.closest('[data-cart-decrease]')) {
      item.cartQty--

      if (item.cartQty <= 0) {
        item.cartQty = 1
      }
      updateCartItemDisplay(item)
    }
    if (target.closest('[data-cart-increase]')) {
      item.cartQty++
      updateCartItemDisplay(item)
    }

    localStorage.setItem('cart-items', JSON.stringify(cart))
    cartUpdate(cart)
  }

  const storageEventHandler = (e) => {
    if (e.key !== 'cart-items') return

    cart = JSON.parse(localStorage.getItem('cart-items'))
    renderItems(cart, cartList, renderOneCartItemCallback)
    cartUpdate(cart)
  }

  if (cart.length > 0) {
    renderItems(cart, cartList, renderOneCartItemCallback)
  }

  if (cartList) {
    cartList.addEventListener('click', cartChangeQty)
  }

  window.addEventListener('storage', storageEventHandler)

  cartUpdate(cart)
}
