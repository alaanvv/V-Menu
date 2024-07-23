<div class='row'>
  <h1> {$menu.name} </h1>
  <a class='right' href={`/m/${menu_names[$menu.id] || $menu.id}`} target='_blank'> <Button i='menu_book' /> </a>
  <Button i='qr_code' action={create_qr} />
  <Button class='blu' i='edit'   t='' action={edit} />
  <Button class='red' i='logout'  action={logout} />
</div>

<table>
  <tr>
    <td> <Icon i='phone' /> Telefone: </td>
    <td> {$menu.phone || 'Não informado.'} </td>
  </tr>
  <tr>
    <td> <Icon i='phone' /> Whatsapp: </td>
    <td> {$menu.whatsapp || 'Não informado.'} </td>
  </tr>
  <tr>
    <td> <Icon i='place' /> Endereço: </td>
    <td> {$menu.address || 'Não informado.'} </td>
  </tr>
  <tr>
    <td> <Icon i='info' />  Cabeçalho: </td>
    <td> {$menu.header  || 'Não informado.'} </td>
  </tr>
  <tr>
    <td> <Icon i='info' />  Rodapé: </td>
    <td> {$menu.footer  || 'Não informado.'} </td>
  </tr>
</table>

<div class='hr' />

{#if !$menu.single_category && $menu.categories.length}
  <Button class='grn' i='add' t='Categoria' action={create_category} />
{/if}

{#each $menu.categories || [] as category}
  <CategoryCard {category} />
{/each}

<MenuModal     bind:show={m_edit} />
<CategoryModal bind:show={m_create_category} />
<QRModal       bind:show={m_qr} />

<script>
  import CategoryModal from '../components/CategoryModal.svelte'
  import CategoryCard  from '../components/CategoryCard.svelte'
  import MenuModal     from '../components/MenuModal.svelte'
  import QRModal       from '../components/QRModal.svelte'
  import Button        from '../components/Button.svelte'
  import Icon          from '../components/Icon.svelte'

  import { session_id, menu } from '../store.js'
  import { api } from '../utils/api.js'

  let menu_names = {
   'clyp7z8db0000cxl6arjgaa23': 'adeildo-lanches'
  }

  let m_edit, m_create_category, m_qr

  function edit()            { m_edit = 1 }
  function create_qr()       { m_qr = 1 }
  function create_category() { m_create_category = 1 }
  function logout() {
    if (!confirm('Certeza que deseja sair dessa conta?')) return

    api(`logout/${session_id}`)
    localStorage.removeItem('session_id')
    session_id.set()
    menu.set()
  }
</script>

<style>
  td {
    padding: 10px 10px 0 0;

    white-space: break-spaces;
  }
  td:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 5px;

    font-weight: bold;
  }
</style>
