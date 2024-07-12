<div>
  <div class='row jcsb'>
    <h1> {$menu.name} </h1>
    <Button class='blu' i='edit' t='Editar Informações' action={edit_menu} />
  </div>

  <table>
    <tr>
      <td> <Icon i='phone' /> Telefone: </td>
      <td> {$menu.phone} </td>
    </tr>
    <tr>
      <td> <Icon i='phone' /> Whatsapp: </td>
      <td> {$menu.whatsapp} </td>
    </tr>
    <tr>
      <td> <Icon i='place' /> Endereço: </td>
      <td> {$menu.address} </td>
    </tr>
  </table>

  <div class='hr' />

  <Button class='grn' i='add' t='Categoria' action={create_category} />

  {#each $menu.categories as category}
    <CategoryCard {category} />
  {/each}
</div>

<MenuModal     bind:show={m_edit_menu} />
<CategoryModal bind:show={m_create_category} />

<script>
  import CategoryModal from '../components/CategoryModal.svelte'
  import CategoryCard  from '../components/CategoryCard.svelte'
  import MenuModal     from '../components/MenuModal.svelte'
  import Button        from '../components/Button.svelte'
  import Icon          from '../components/Icon.svelte'

  import { menu } from '../store.js'

  let m_edit_menu, m_create_category

  function edit_menu()       { m_edit_menu       = 1 }
  function create_category() { m_create_category = 1 }
</script>

<style>
  td {
    padding: 10px 10px 0 0;
  }
  td:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 5px;

    font-weight: bold;
  }
</style>
