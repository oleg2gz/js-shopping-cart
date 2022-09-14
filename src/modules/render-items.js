export const renderItems = (items, block, cb) => {
  if (block) {
    block.innerHTML = ''
    block.insertAdjacentHTML('afterbegin', items.map(cb).join(''))
  }
}
