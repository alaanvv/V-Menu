<div class='row' style='flex-wrap: wrap;'>
  <input placeholder='Pesquisar' bind:value={query}>

  <select bind:value={category_id} style='margin-left: auto;'>
    <option value={false}> Todas categorias </option>
    {#each $menu.categories as category}
      <option value={category.id}> {category.name} </option>
    {/each}
  </select>

  <select bind:value={subcategory_id} disabled={!category_id}>
    <option value={false}> Todas subcategorias </option>
    {#each ($menu.categories.find(c => c.id == category_id) || []).subcategories || [] as subcategory}
      <option value={subcategory.id}> {subcategory.name} </option>
    {/each}
  </select>
</div>

{#each filtered_menu.categories as category}
  <div class='hr' />

  <h1> {category.name} </h1>

  {#each category.subcategories as subcategory}
    <SubcategoryTable {subcategory} />
  {/each}
{/each}

<script>
  import SubcategoryTable from '../components/SubcategoryTable.svelte'

  import { menu } from '../store.js'

  let category_id, subcategory_id, query
  let filtered_menu

  function apply_filters(category_id, subcategory_id, query) {
    if (!$menu.categories.find(c => c.id == category_id)?.subcategories.find(sc => sc.id == subcategory_id))
      subcategory_id = false

    filtered_menu = { ...$menu }

    if (category_id)
      filtered_menu.categories = filtered_menu.categories.filter(c => c.id == category_id)

    if (subcategory_id)
      filtered_menu.categories = filtered_menu.categories.map(c => c.id != category_id ? c : { ...c, subcategories: c.subcategories.filter(sc => sc.id == subcategory_id) })

    if (query)
      filtered_menu.categories = filtered_menu.categories.map(c => ({ ...c, subcategories: c.subcategories.map(sc => ({ ...sc, items: sc.items.filter(i => i.name.toLowerCase().includes(query.toLowerCase())) })) }))
  }

  $: apply_filters(category_id, subcategory_id, query)
</script>

<style>
  @media screen and (max-width: 768px) {
    input {
      width: 100%;
    }

    select {
      margin: 0 !important;
    }
  }
</style>
