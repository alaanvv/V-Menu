<table>
  <thead>
    <tr>
      <td colspan=3> <h2> {subcategory.name} </h2> </td>
      <td> <Button class='grn' i='add' action={create_item} /> </td>
    </tr>
  </thead>
  <tbody>
    {#each subcategory.items as item}
      <ItemRow {item} />
    {/each}
  </tbody>
</table>

<ItemModal bind:show={m_item} subcategory_id={subcategory.id} />

<script>
  import ItemModal from '../components/ItemModal.svelte'
  import ItemRow   from '../components/ItemRow.svelte'
  import Button    from '../components/Button.svelte'

  import { menu } from '../store.js'

  export let subcategory
  let m_item

  function create_item() { m_item = 1 }
  function update_items(menu) {
    const category = menu.categories.find(c => c.id == subcategory.category_id)
    const _subcategory = category.subcategories.find(sc => sc.id == subcategory.id)
    subcategory.items = _subcategory.items
  }

  $: update_items($menu)
</script>

<style>
  table {
    border-collapse: collapse;
    margin: 10px 0;
    border: 3px solid var(--gray);
    width: 100%;
  }

  table :global(td) {
    padding: 8px;
    border-bottom: 3px solid var(--gray);
  }
  table :global(td:nth-child(4)), thead td:nth-child(2) {
    width: 1px;
    white-space: nowrap;
  }
  table :global(td:nth-child(3)) {
    white-space: nowrap;
  }
  table :global(tr:nth-child(odd):not(thead tr)) {
    background: var(--bg0_h);
  }
  table :global(td:not(thead td)) {
    border-right: 2px solid var(--gray);
  }
</style>
