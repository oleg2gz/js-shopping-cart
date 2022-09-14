import {useFetch} from './modules/fetch/use-fetch'
import {normalizeApiData} from './modules/fetch/fetch-data-normalize'
import {renderItems} from './modules/render-items'
import {mainCart} from './modules/main-cart'

const itemsList = document.querySelector('[data-items-list]')

const renderOneItemCallback = (item) => `
  <div class="image" data-item-id="${item.id}">
  <img src="./img/${item.img}" alt="${item.name} ${item.id}" />
  <h3>${item.name}</h3>
  <h3>$${item.price.toFixed(2)}</h3>
  <a class="add-cart cart" data-cart-add href="#">
  Add to cart
  </a>
  </div>`

useFetch('apiUrl').then((data) => {
  const items = data.map(normalizeApiData)

  localStorage.setItem('all-items', JSON.stringify(items))
  renderItems(items, itemsList, renderOneItemCallback)
})

mainCart(itemsList)
