<tr>
  <td> {item.name} </td>
  <td> {item.description || 'Sem descrição'} </td>
  <td> R$ {format_price(item.price_in_cents)} </td>
  <td> <Button class='blu' i='edit' action={show_options} /> </td>
</tr>

<Modal bind:show={m_options}>
  <p class='special'> Produto: {item.name} </p>
  <div class='btn-col'>
    <Button class='blu' i='edit'    t='Editar'   action={edit} />
    <Button class='red' i='delete'  t='Excluir'  action={_delete} />
    <Button i='keyboard_arrow_up'   t='Mover pra cima' action={move_up} disabled={i == 0} />
    <Button i='keyboard_arrow_down' t='Mover pra baixo' action={move_down} disabled={i == items_length - 1} />
    <Button i='close'               t='Cancelar'        action={_ => m_options = false} />
  </div>
</Modal>
<ItemModal bind:show={m_edit} {item} subcategory_id={item.subcategory_id} />

{#if l_deleting}
  <Modal show={true}> Excluindo... </Modal>
{/if}

<script>
  import ItemModal from '../components/ItemModal.svelte'
  import Button from '../components/Button.svelte'
  import Modal from '../components/Modal.svelte'

  import { delete_item, move_item_up, move_item_down } from '../utils/menu-management.js'
  import { format_price } from '../utils/misc.js'
  import { menu } from '../store.js'

  export let item
  let m_options, m_edit
  let i, items_length
  let l_deleting

  function show_options() { m_options = 1 }
  function edit()         { m_options = 0; m_edit    = 1 }
  async function _delete() {
    m_options = 0
    if (!confirm(`Certeza que quer excluir o produto ${item.name}?`)) return

    l_deleting = true
    await delete_item(item.id)
    l_deleting = false
  }
  function move_up() {
    m_options = 0
    move_item_up(item.id)
  }
  function move_down() {
    m_options = 0
    move_item_down(item.id)
  }

  function update_i() {
    const category = $menu.categories.find(c => c.subcategories.find(sc => sc.id == item.subcategory_id))
    const subcategory = category?.subcategories.find(sc => sc.id == item.subcategory_id)
    const items = subcategory?.items
    items_length = items?.length

    i = items?.findIndex(i => i.id == item.id)
  }

  $: if ($menu) update_i()
</script>

<style>
  .special {
    margin: 0 0 20px 0;

    text-align: center;
  }
</style>
