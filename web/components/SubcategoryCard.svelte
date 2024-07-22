<!-- svelte-ignore a11y-click-events-have-key-events -->
<li class='row'>
  <p class='cp fg' on:click={show_options}> {subcategory.name || 'Sem nome' } </p>

  <Button i='settings' action={show_options} />
  <Button i='keyboard_arrow_up' action={move_up} disabled={i == 0} />
  <Button i='keyboard_arrow_down' action={move_down} disabled={i == category.subcategories.length - 1} />
</li>

<Modal bind:show={m_options}>
  <p class='special'> {$menu.single_category ? 'Categoria' : 'Subcategoria'}: {subcategory.name} </p>
  <div class='btn-col'>
    <Button class='blu' i='edit'   t='Editar'   action={edit} />
    <Button class='red' i='delete' t='Excluir'  action={_delete} />
    <Button             i='close'  t='Cancelar' action={_ => m_options = false} />
  </div>
</Modal>
<SubcategoryModal bind:show={m_edit} {subcategory} category_id={subcategory.category_id} />

{#if l_deleting}
  <Modal show={true}> Excluindo... </Modal>
{/if}

{#if l_moving}
  <Modal show={true}> Movendo... </Modal>
{/if}

<script>
  import SubcategoryModal from '../components/SubcategoryModal.svelte'
  import Button           from '../components/Button.svelte'
  import Modal            from '../components/Modal.svelte'

  import { delete_subcategory, move_subcategory_up, move_subcategory_down } from '../utils/menu-management.js'
  import { menu } from '../store.js'

  export let subcategory
  let m_edit, m_options
  let category, i
  let l_deleting, l_moving

  function show_options() { m_options = 1 }
  function edit()         { m_options = 0; m_edit    = 1 }
  async function _delete() {
    m_options = 0
    if (!confirm(`Certeza que quer excluir a ${$menu.single_category ? 'categoria' : 'subcategoria'} ${subcategory.name}?`)) return

    l_deleting = true
    await delete_subcategory(subcategory.id)
    l_deleting = false
  }
  async function move_up()   {
    l_moving = true
    await move_subcategory_up(subcategory.id)
    l_moving = false
  }
  async function move_down() {
    l_moving = true
    await move_subcategory_down(subcategory.id)
    l_moving = false
  }

  function update_i() {
    category = $menu.categories.find(c => c.subcategories?.find(sc => sc.id == subcategory.id))
    i = category.subcategories.findIndex(sc => sc.id == subcategory.id)
  }

  $: if ($menu) update_i()
</script>

<style>
  li {
    padding: 10px;
    margin-top: 15px;

    background: var(--bg0_h);
    border-radius: 10px;
  }

  .special {
    margin: 0 0 20px 0;

    text-align: center;
  }
</style>
