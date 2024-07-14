import { menu as _menu } from '../store.js'
import { get } from 'svelte/store'
import { api } from './api.js'

// Menu
export async function edit_menu(_data) {
  let menu = get(_menu)

  await api(`menu/${menu.id}`, 'PUT', _data)

  menu = { ...menu, ..._data }

  _menu.set(menu)
}

// Category
export async function create_category(_data) {
  const menu = get(_menu)

  const { data } = await api(`category/${menu.id}`, 'POST', _data)

  menu.categories.push(data.category)

  _menu.set(menu)
}

export async function edit_category(id, _data) {
  const menu = get(_menu)

  await api(`category/${id}`, 'PUT', _data)

  for (let ci in menu.categories)
    if (menu.categories[ci].id == id)
      menu.categories[ci] = { ...menu.categories[ci], ..._data }

  _menu.set(menu)
}

export async function delete_category(id) {
  const menu = get(_menu)

  await api(`category/${id}`, 'DELETE')

  menu.categories = menu.categories.filter(c => c.id != id)

  _menu.set(menu)
}

export async function move_category_up(id) {
  const menu = get(_menu)

  api(`raise-category/${id}`, 'PUT')

  const i = menu.categories.findIndex(c => c.id == id)
  const item = menu.categories.splice(i, 1)[0]
  menu.categories = [...menu.categories.slice(0, i - 1), item, ...menu.categories.slice(i - 1)]

  _menu.set(menu)
}

export async function move_category_down(id) {
  const menu = get(_menu)

  const i = menu.categories.findIndex(c => c.id == id)
  await move_category_up(menu.categories[i + 1].id)
}

// Subcategory
export async function create_subcategory(id, _data) {
  const menu = get(_menu)

  const { data } = await api(`subcategory/${id}`, 'POST', _data)

  for (let ci in menu.categories)
    if (menu.categories[ci].id == id)
      menu.categories[ci].subcategories.push(data.subcategory)

  _menu.set(menu)
}

export async function edit_subcategory(id, _data) {
  const menu = get(_menu)

  await api(`subcategory/${id}`, 'PUT', _data)

  for (let ci in menu.categories) {
    const sci = menu.categories[ci].subcategories.findIndex(sc => sc.id == id)
    if (sci == -1) continue

    menu.categories[ci].subcategories[sci] = { ...menu.categories[ci].subcategories[sci], ..._data }
    break
  }

  _menu.set(menu)
}

export async function delete_subcategory(id) {
  const menu = get(_menu)

  await api(`subcategory/${id}`, 'DELETE')

  for (let ci in menu.categories)
    menu.categories[ci].subcategories = menu.categories[ci].subcategories.filter(sc => sc.id != id)

  _menu.set(menu)
}

export async function move_subcategory_up(id) {
  const menu = get(_menu)

  api(`raise-subcategory/${id}`, 'PUT')

  for (let ci in menu.categories) {
    const sci = menu.categories[ci].subcategories.findIndex(sc => sc.id == id)
    if (sci == -1) continue

    const item = menu.categories[ci].subcategories.splice(sci, 1)[0]
    menu.categories[ci].subcategories = [...menu.categories[ci].subcategories.slice(0, sci - 1), item, ...menu.categories[ci].subcategories.slice(sci - 1)]
    break
  }

  _menu.set(menu)
}

export async function move_subcategory_down(id) {
  const menu = get(_menu)

  for (let ci in menu.categories) {
    const sci = menu.categories[ci].subcategories.findIndex(sc => sc.id == id)
    if (sci == -1) continue

    await move_subcategory_up(menu.categories[ci].subcategories[sci + 1].id)
    break
  }
}
