<li class='row'>
  {subcategory.name}

  <div style='margin-left: auto;' />
  <Button class='blu' i='edit' action={edit_subcategory} />
  <Button class='red' i='delete' action={delete_subcategory} />
  <Button             i='keyboard_arrow_down' />
  <Button             i='keyboard_arrow_up' />
</li>

<SubcategoryModal bind:show={m_edit} id={subcategory.id} category_id={subcategory.category_id} />

<script>
  import SubcategoryModal from '../components/SubcategoryModal.svelte'
  import Button           from '../components/Button.svelte'

  import { api } from '../utils/api.js'
  import { menu } from '../store.js'

  export let subcategory
  let m_edit

  function edit_subcategory() { m_edit = 1 }
  function delete_subcategory() {
    if (!confirm('Certeza que quer excluir essa subcategoria?')) return

    api(`subcategory/${subcategory.id}`, 'DELETE')

    const new_menu = $menu
    for (let i in new_menu.categories)
      if (new_menu.categories[i].id == subcategory.category_id)
        new_menu.categories[i].subcategories = new_menu.categories[i].subcategories.filter(sc => sc.id != subcategory.id)

    menu.set(new_menu)
  }
</script>

<style>
  li {
    padding: 10px;
    margin-top: 15px;

    background: var(--bg0_h);
    border-radius: 10px;
  }
</style>
