<div class='wrapper m0a'>
  <Button class='grn' action={create_menu} i='add' t='New menu' />

  <div class='cards'>
    {#each menus || [] as menu}
      <div class='card row'>
        <h2 class='special tac'> {menu.name} </h2>
        <Button class='blu right' action={_ => edit_menu(menu)}      i='edit' />
        <Button class='red'     action={_ => delete_menu(menu.id)} i='delete' />
      </div>
    {/each}
  </div>
</div>

<AdminModal bind:show={m_menu} {menu} />

<script>
  import AdminModal from '../components/AdminModal.svelte'
  import Button     from '../components/Button.svelte'

  import { onMount } from 'svelte'
  import { api } from '../utils/api.js'

  let menus, menu
  let m_menu

  async function create_menu() {
    m_menu = true
  }

  async function edit_menu(_menu) {
    menu = _menu
    m_menu = true
  }

  async function delete_menu(id) {
    if (!confirm('Are you sure you want to delete it?')) return
    await api(`menu/${id}`, 'DELETE')
    menus = menus.filter(m => m.id != id)
  }

  onMount(async _ => { menus = (await api('menus')).data.menus })
</script>

<style>
  .wrapper {
    max-width: 400px;
  }

  .wrapper > :global(*) {
    width: 100%;
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 10px;

    margin-top: 30px;
  }

  .card {
    box-sizing: border-box;
    display: inline-flex;

    width: 100%;
  }
</style>
