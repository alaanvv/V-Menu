import { menu as _menu } from '../store.js'
import { get } from 'svelte/store'
import { api } from './api.js'

// Menu
export async function create_menu(_data) {
  await api(`menu`, 'POST', _data)
}

export async function adm_edit_menu(id, _data) {
  for (let key in _data)
    if (_data[key] == null)
      delete _data[key]

  await api(`menu/${id}`, 'PUT', _data)
}

export async function edit_menu(_data) {
  for (let key in _data)
    if (_data[key] == null)
      delete _data[key]

  let menu = get(_menu)

  await api(`menu/${menu.id}`, 'PUT', _data)

  menu = { ...menu, ..._data }

  _menu.set(menu)
}

// Category
export async function create_category(_data) {
  const menu = get(_menu)

  const { data } = await api(`category/${menu.id}`, 'POST', _data)

  menu.categories = [...(menu.categories || []), data.category]

  _menu.set(menu)
}

export async function edit_category(id, _data) {
  for (let key in _data)
    if (_data[key] == null)
      delete _data[key]

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

  await api(`raise-category/${id}`, 'PUT')

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
      menu.categories[ci].subcategories = [...(menu.categories[ci].subcategories || []), data.subcategory]

  _menu.set(menu)
}

export async function edit_subcategory(id, _data) {
  for (let key in _data)
    if (_data[key] == null)
      delete _data[key]

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

  await api(`raise-subcategory/${id}`, 'PUT')

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

// Item
export async function create_item(id, _data) {
  const menu = get(_menu)

  const { data } = await api(`item/${id}`, 'POST', _data)

  for (let ci in menu.categories) {
    const sci = menu.categories[ci].subcategories.findIndex(sc => sc.id == id)
    if (sci == -1) continue

    menu.categories[ci].subcategories[sci].items = [...(menu.categories[ci].subcategories[sci].items || []), data.item]
    break
  }

  _menu.set(menu)
}

export async function edit_item(id, _data) {
  for (let key in _data)
    if (_data[key] == null)
      delete _data[key]

  const menu = get(_menu)

  await api(`item/${id}`, 'PUT', _data)

  for (let ci in menu.categories)
    for (let sci in menu.categories[ci].subcategories)
      for (let ii in menu.categories[ci].subcategories[sci].items)
        if (menu.categories[ci].subcategories[sci].items[ii].id == id) {
          menu.categories[ci].subcategories[sci].items[ii] = { ...menu.categories[ci].subcategories[sci].items[ii], ..._data }
          break
        }

  _menu.set(menu)
}

export async function delete_item(id) {
  const menu = get(_menu)

  await api(`item/${id}`, 'DELETE')

  for (let ci in menu.categories)
    for (let sci in menu.categories[ci].subcategories)
      menu.categories[ci].subcategories[sci].items = menu.categories[ci].subcategories[sci].items.filter(i => i.id != id)

  _menu.set(menu)
}

export async function move_item_up(id) {
  const menu = get(_menu)

  await api(`raise-item/${id}`, 'PUT')

  for (let ci in menu.categories) {
    const sci = menu.categories[ci].subcategories.findIndex(sc => sc.items.find(i => i.id == id))
    if (sci == -1) continue
    const ii = menu.categories[ci].subcategories[sci].items.findIndex(i => i.id == id)

    const item = menu.categories[ci].subcategories[sci].items.splice(ii, 1)[0]
    menu.categories[ci].subcategories[sci].items = [...menu.categories[ci].subcategories[sci].items.slice(0, ii - 1), item, ...menu.categories[ci].subcategories[sci].items.slice(ii - 1)]
    break
  }

  _menu.set(menu)
}

export async function move_item_down(id) {
  const menu = get(_menu)

  for (let ci in menu.categories) {
    const sci = menu.categories[ci].subcategories.findIndex(sc => sc.items.find(i => i.id == id))
    if (sci == -1) continue
    const ii = menu.categories[ci].subcategories[sci].items.findIndex(i => i.id == id)

    await move_item_up(menu.categories[ci].subcategories[sci].items[ii + 1].id)
    break
  }
}
