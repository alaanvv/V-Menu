<div class='category'>
  <div class='row toprow jcsb'>
    <h2> {category.name} </h2>

    <div class='row jce'>
      <Button i='settings' action={show_options} />
      <Button i='keyboard_arrow_up' action={move_up} disabled={i == 0} />
      <Button i='keyboard_arrow_down' action={move_down} disabled={i == $menu.categories.length - 1} />
    </div>
  </div>

  <ul>
    {#each category.subcategories || [] as subcategory}
      <SubcategoryCard {subcategory} />
    {/each}
  </ul>
</div>

<Modal bind:show={m_options}>
  <p class='special'> Categoria: {category.name} </p>
  <div class='btn-col'>
    <Button class='grn' i='add'    t='Subcategoria' action={create_sub} />
    <Button class='blu' i='edit'   t='Editar'       action={edit} />
    <Button class='red' i='delete' t='Excluir'      action={_delete} />
  </div>
</Modal>
<CategoryModal    bind:show={m_edit}        {category} />
<SubcategoryModal bind:show={m_subcategory} category_id={category.id} />

<script>
  import SubcategoryModal from '../components/SubcategoryModal.svelte'
  import SubcategoryCard  from '../components/SubcategoryCard.svelte'
  import CategoryModal    from '../components/CategoryModal.svelte'
  import Button           from '../components/Button.svelte'
  import Modal            from '../components/Modal.svelte'

  import { delete_category, move_category_up, move_category_down } from '../utils/menu-management.js'
  import { menu } from '../store.js'

  export let category
  let m_edit, m_subcategory, m_options
  let i

  function create_sub()   { m_options = 0; m_subcategory = 1 }
  function edit()         { m_options = 0; m_edit        = 1 }
  function show_options() { m_options = 1 }
  function _delete() {
    m_options = 0
    if (!confirm('Certeza que quer excluir essa categoria?')) return

    delete_category(category.id)
  }
  function move_up()   { move_category_up(category.id)   }
  function move_down() { move_category_down(category.id) }

  $: i = $menu?.categories.findIndex(c => c.id == category.id)
</script>

<style>
  .category {
    padding: 15px;
    border: 3px solid var(--gray);
    margin-top: 15px;
  }

  .special {
    margin: 0 0 20px 0;

    text-align: center;
  }
</style>
