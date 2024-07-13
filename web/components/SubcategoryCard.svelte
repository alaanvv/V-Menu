<!-- svelte-ignore a11y-click-events-have-key-events -->
<li class='row'>
  <p class='cp' style='flex-grow:2;' on:click={show_options}> {subcategory.name} </p>

  <Button i='keyboard_arrow_up' action={move_up} disabled={i == 0} />
  <Button i='keyboard_arrow_down' action={move_down} disabled={i == category.subcategories.length - 1} />
</li>

<Modal bind:show={m_options}>
  <p class='special'> Subcategoria: {subcategory.name} </p>
  <div class='btn-col'>
    <Button class='blu' i='edit'   t='Editar'   action={edit} />
    <Button class='red' i='delete' t='Excluir'  action={_delete} />
  </div>
</Modal>
<SubcategoryModal bind:show={m_edit} id={subcategory.id} category_id={subcategory.category_id} />

<script>
  import SubcategoryModal from '../components/SubcategoryModal.svelte'
  import Button           from '../components/Button.svelte'
  import Modal            from '../components/Modal.svelte'

  import { api } from '../utils/api.js'
  import { menu } from '../store.js'

  export let subcategory
  let m_edit, m_options
  let category, i

  function show_options() { m_options = 1 }
  function edit()         { m_options = 0; m_edit    = 1 }
  function _delete() {
    m_options = 0
    if (!confirm('Certeza que quer excluir essa subcategoria?')) return

    api(`subcategory/${subcategory.id}`, 'DELETE')

    const new_menu = $menu
    for (let i in new_menu.categories)
      if (new_menu.categories[i].id == subcategory.category_id)
        new_menu.categories[i].subcategories = new_menu.categories[i].subcategories.filter(sc => sc.id != subcategory.id)

    menu.set(new_menu)
  }
  function move_up() {
    api(`raise-subcategory/${subcategory.id}`, 'PUT')

    let arr = category.subcategories

    let temp = arr[i - 1]
    arr[i - 1] = arr[i]
    arr[i] = temp

    menu.set({ ...$menu, categories: $menu.categories.map(c => c.id != category.id ? c : { ...c, subcategories: arr }) })
  }
  function move_down() {
    let next, id
    for (let sc of category.subcategories) {
      if (next) {
        id = sc.id
        break
      }
      if (sc.id == subcategory.id) next = true
    }

    api(`raise-subcategory/${id}`, 'PUT')

    let arr = category.subcategories

    let temp = arr[i + 1]
    arr[i + 1] = arr[i]
    arr[i] = temp

    menu.set({ ...$menu, categories: $menu.categories.map(c => c.id != category.id ? c : { ...c, subcategories: arr }) })
  }

  function update_i() {
    category = $menu.categories.find(c => (c.subcategories || []).find(sc => sc.id == subcategory.id))
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
