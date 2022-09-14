export const getCartQty = (cart) => {
  return cart.reduce((acc, {cartQty}) => acc + cartQty, 0)
}

export const getCartTotal = (cart) => {
  return cart
    .reduce((acc, {price, cartQty}) => acc + (price * 100 * cartQty) / 100, 0)
    .toFixed(2)
}

export const getItemTotal = (price, cartQty) => {
  return parseFloat((price * 100 * cartQty) / 100).toFixed(2)
}
