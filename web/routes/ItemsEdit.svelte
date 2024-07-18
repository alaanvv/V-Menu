<div class='row'>
  <input placeholder='Pesquisar' bind:value={query}>

  <select bind:value={category_id}>
    <option value={undefined}> Todas categorias </option>
    {#each $menu.categories || [] as category}
      <option value={category.id}> {category.name} </option>
    {/each}
  </select>

  <select bind:value={subcategory_id} disabled={!category_id}>
    <option value={undefined}> Todas subcategorias </option>
    {#each category?.subcategories || [] as subcategory}
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

{#if !filtered_menu.categories.length && (query || category_id || subcategory_id)}
  <p>
    Nada encontrado para esses filtros.
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class='underline cp' on:click={clear_filters}> Limpar filtros </span>
  </p>
{/if}

<script>
  import SubcategoryTable from '../components/SubcategoryTable.svelte'

  import { menu } from '../store.js'
  import { minify_text } from '../utils/misc.js'

  let category_id, subcategory_id, category, subcategory, query = ''
  let filtered_menu

  function apply_filters(category_id, subcategory_id, query) {
    if (!$menu.categories.find(c => c.id == category_id)?.subcategories.find(sc => sc.id == subcategory_id))
      subcategory_id = undefined

    filtered_menu = JSON.parse(JSON.stringify($menu))

    if (category_id)
      filtered_menu.categories = filtered_menu.categories.filter(c => c.id == category_id)

    if (subcategory_id)
      filtered_menu.categories = filtered_menu.categories.map(c => c.id != category_id ? c : { ...c, subcategories: c.subcategories.filter(sc => sc.id == subcategory_id) })

    if (query) {
      function includes_arr(text, arr) {
        for (let item of arr)
          if (!text.includes(item)) return 0
        return 1
      }

      filtered_menu.categories.forEach(c => {
        c.subcategories.forEach(sc => {
          sc.items = sc.items.filter(item => includes_arr(minify_text(item.name.replaceAll(' ', '')), minify_text(query).split(' ')))
        })
        c.subcategories = c.subcategories.filter(sc => sc.items.length)
      })
      filtered_menu.categories = filtered_menu.categories.filter(c => c.subcategories.length)
    }
  }

  function clear_filters() {
    query = ''
    category_id = undefined
    subcategory_id = undefined
  }

  $: apply_filters(category_id, subcategory_id, query)
  $: category    = $menu.categories.find(c => c.id == category_id)
  $: subcategory = category?.subcategories.find(sc => sc.id == subcategory_id)
</script>

<style>
  select:nth-child(2) {
    margin-left: auto;
  }

  .row {
    flex-wrap: wrap;
  }

  @media screen and (max-width: 768px) {
    input {
      width: 100%;
    }

    select {
      margin: 0 !important;
    }
  }
</style>
