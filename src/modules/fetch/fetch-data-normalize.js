export const normalizeApiData = ({id, name, price, tag}) => {
  return {
    id,
    name,
    price,
    cartQty: 1,
    img: `${tag}.jpg`,
  }
}
