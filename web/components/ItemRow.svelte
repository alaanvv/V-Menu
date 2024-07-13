<tr>
  <td> {item.name} </td>
  <td> {item.description} </td>
  <td> R$ {String(item.price_in_cents / 100).replace('.', ',')} </td>
  <td> <Button class='blu' i='edit' action={show_options} /> </td>
</tr>

<Modal bind:show={m_options}>
  <p class='special'> Produto: {item.name} </p>
  <div class='btn-col'>
    <Button class='blu' i='edit'   t='Editar'   action={edit} />
    <Button class='red' i='delete' t='Excluir'  action={_delete} />
    <Button i='keyboard_arrow_up'  t='Mover pra cima' action={move_up} disabled={i == 0} />
    <Button i='keyboard_arrow_down' t='Mover pra baixo' action={move_down} disabled={i == items_length - 1} />
  </div>
</Modal>
<ItemModal bind:show={m_edit} id={item.id} subcategory_id={item.subcategory_id} />

<script>
  import ItemModal from '../components/ItemModal.svelte'
  import Button from '../components/Button.svelte'
  import Modal from '../components/Modal.svelte'

  import { menu } from '../store.js'
  import { api }  from '../utils/api.js'

  export let item
  let m_options, m_edit
  let i, items_length

  function show_options() { m_options = 1 }
  function edit()         { m_options = 0; m_edit    = 1 }
  function _delete() {
    m_options = 0
    if (!confirm('Certeza que quer excluir esse produto?')) return

    api(`item/${item.id}`, 'DELETE')

    const new_menu = $menu
    for (let i in new_menu.categories)
      if (new_menu.categories[i].subcategories.find(sc => sc.id == item.subcategory_id))
        for (let j in new_menu.categories[i].subcategories)
          if (new_menu.categories[i].subcategories[j].id == item.subcategory_id)
            new_menu.categories[i].subcategories[j].items = new_menu.categories[i].subcategories[j].items.filter(it => it.id != item.id)

    menu.set(new_menu)
  }

  function move_up() {
    m_options = 0
    api(`raise-item/${item.id}`, 'PUT')

    const category = $menu.categories.find(c => c.subcategories.find(sc => sc.id == item.subcategory_id))
    const subcategory = category.subcategories.find(sc => sc.id == item.subcategory_id)
    const arr = subcategory.items

    let temp = arr[i - 1]
    arr[i - 1] = arr[i]
    arr[i] = temp

    const new_menu = $menu

    subcategory.items = arr
    category.subcategories.map(sc => sc.id != subcategory.id ? sc : subcategory)
    new_menu.categories.map(c => c.id != category.id ? c : category)

    menu.set(new_menu)
  }
  function move_down() {
    m_options = 0

    const category = $menu.categories.find(c => c.subcategories.find(sc => sc.id == item.subcategory_id))
    const subcategory = category.subcategories.find(sc => sc.id == item.subcategory_id)
    const arr = subcategory.items

    let next, id
    for (let i of arr) {
      if (next) {
        id = i.id
        break
      }
      if (i.id == item.id) next = true
    }

    api(`raise-item/${id}`, 'PUT')

    let temp = arr[i + 1]
    arr[i + 1] = arr[i]
    arr[i] = temp

    const new_menu = $menu

    subcategory.items = arr
    category.subcategories.map(sc => sc.id != subcategory.id ? sc : subcategory)
    new_menu.categories.map(c => c.id != category.id ? c : category)

    menu.set(new_menu)
  }

  function update_i() {
    const category = $menu.categories.find(c => c.subcategories.find(sc => sc.id == item.subcategory_id))
    const subcategory = category.subcategories.find(sc => sc.id == item.subcategory_id)
    const items = subcategory.items
    items_length = items.length

    i = items.findIndex(i => i.id == item.id)
  }

  $: if ($menu) update_i()
</script>

<style>
  .special {
    margin: 0 0 20px 0;

    text-align: center;
  }
</style>
