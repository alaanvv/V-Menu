<Modal {show} on:close={close}>
  <h2 class='special tac'> {menu ? `Categoria: ${menu.name}` : 'Criando uma categoria'} </h2>

  <form>
    <label> Username: <input bind:value={form.username} required /> </label>
    <label> Password: <input bind:value={form.password} required /> </label>

    <label> Name: <input bind:value={form.name} required /> </label>
    <label> Path: <input bind:value={form.path} required /> </label>

    <label> Single category: <input checked={form.single_category} type='checkbox' required /> </label>

    <button class='grn' on:click={submit} disabled={l_submitting}> {l_submitting ? '...' : (menu ? 'Edit' : 'Create')} </button>
    <button class='red' style='margin-top: 10px;' on:click={close} disabled={l_submitting}> Cancel </button>
  </form>
</Modal>

<script>
  import Modal from './Modal.svelte'

  import { create_menu, adm_edit_menu } from '../utils/menu-management.js'

  export let show, menu
  let l_submitting
  let form

  function close() { show = false }

  async function submit() {
    l_submitting = true

    form.single_category = form.single_category == ''
    if (menu) await adm_edit_menu(menu.id, form)
    else      await create_menu(form)
    close()
  }

  function mount() {
    l_submitting = false
    form = {
      username: menu?.username,
      password: menu?.password,
      name: menu?.name,
      path: menu?.path,
      single_category: menu?.single_category
    }
  }

  $: if (show) mount()
</script>

<style>
  label {
    margin: 20px 0;

    text-align: start;
  }
  label:not(.row) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
