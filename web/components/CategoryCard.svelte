<div class='category'>
  <div class='row' style='justify-content: space-between;'>
    <h2> {category.name} </h2>

    <div class='row' style='justify-content: end;'>
      <Button class='grn' i='add'    t='Subcategoria' action={create_sub} />
      <Button class='blu' i='edit'   action={edit} />
      <Button class='red' i='delete' action={_delete} />
      <Button             i='keyboard_arrow_up' action={move_up} disabled={i == 0} />
      <Button             i='keyboard_arrow_down' action={move_down} disabled={i == $menu.categories.length - 1} />
    </div>
  </div>

  <ul>
    {#each category.subcategories || [] as subcategory}
      <SubcategoryCard {subcategory} />
    {/each}
  </ul>
</div>

<CategoryModal    bind:show={m_edit}        id={category.id} />
<SubcategoryModal bind:show={m_subcategory} category_id={category.id} />

<script>
  import SubcategoryModal from '../components/SubcategoryModal.svelte'
  import SubcategoryCard  from '../components/SubcategoryCard.svelte'
  import CategoryModal    from '../components/CategoryModal.svelte'
  import Button           from '../components/Button.svelte'

  import { api } from '../utils/api.js'
  import { menu } from '../store.js'

  export let category
  let m_edit, m_subcategory
  let i

  function create_sub() { m_subcategory = 1 }
  function edit()       { m_edit        = 1 }
  function _delete() {
    if (!confirm('Certeza que quer excluir essa categoria?')) return

    api(`category/${category.id}`, 'DELETE')
    menu.set({ ...$menu, categories: $menu.categories.filter(c => c.id != category.id) })
  }
  function move_up() {
    api(`raise-category/${category.id}`, 'PUT')

    const i = $menu.categories.findIndex(c => c.id == category.id)
    let arr = $menu.categories

    let temp = arr[i - 1]
    arr[i - 1] = arr[i]
    arr[i] = temp

    menu.set({ ...$menu, categories: arr })
  }
  function move_down() {
    let next, id
    for (let c of $menu.categories) {
      if (next) {
        id = c.id
        break
      }
      if (c.id == category.id) next = true
    }

    api(`raise-category/${id}`, 'PUT')

    let arr = $menu.categories

    let temp = arr[i + 1]
    arr[i + 1] = arr[i]
    arr[i] = temp

    menu.set({ ...$menu, categories: arr })
  }

  function update_i() {
    i = $menu.categories.findIndex(c => c.id == category.id)
  }

  $: if ($menu) update_i()
</script>

<style>
  .category {
    padding: 15px;
    border: 3px solid var(--gray);
    margin-top: 15px;
  }
</style>
