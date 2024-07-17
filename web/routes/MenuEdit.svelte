<div class='row'>
  <h1> {$menu.name} </h1>
  <Button class='right blu' i='edit'   t='Editar' action={edit} />
  <Button                   i='menu_book'         action={goto_menu} />
  <Button                   i='logout'    action={logout} />
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

{#each $menu.categories || [] as category}
  <CategoryCard {category} />
{/each}

<MenuModal     bind:show={m_edit} />
<CategoryModal bind:show={m_create_category} />

<script>
  import CategoryModal from '../components/CategoryModal.svelte'
  import CategoryCard  from '../components/CategoryCard.svelte'
  import MenuModal     from '../components/MenuModal.svelte'
  import Button        from '../components/Button.svelte'
  import Icon          from '../components/Icon.svelte'

  import { session_id, menu } from '../store.js'
  import { api } from '../utils/api.js'

  let m_edit, m_create_category

  function edit()            { m_edit = 1 }
  function create_category() { m_create_category = 1 }
  function logout() {
    if (!confirm('Certeza que deseja sair dessa conta?')) return

    api(`logout/${session_id}`)
    localStorage.removeItem('session_id')
    session_id.set()
    menu.set()
  }
  function goto_menu() {
    window.location.href = `/s/cardapio/${$menu.id}`
  }
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
