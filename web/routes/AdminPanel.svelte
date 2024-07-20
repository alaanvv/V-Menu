<form>
  <label> Username: <input bind:value={form.username} required /> </label>
  <label> Password: <input bind:value={form.password} required /> </label>
  <label> Name:     <input bind:value={form.name}     required /> </label>
  <label> Path:     <input bind:value={form.path}     required /> </label>

  <Button disabled={l_submitting} action={submit} t={l_submitting ? '...' : 'Create'} />
</form>

<div class='hr' />

<div class='cards'>
{#each menus || [] as menu}
  <div class='card row'>
    <h2 class='special tac'> {menu.name} </h2>
    <Button class='red' action={_ => delete_menu(menu.id)} i='delete' />
  </div>
{/each}
</div>

<script>
  import Button from '../components/Button.svelte'

  import { onMount } from 'svelte'
  import { api } from '../utils/api.js'

  let menus
  let form = {}
  let l_submitting

  async function submit() {
    l_submitting = true
    const { data } = await api('menu', 'POST', form)
    menus = [...menus, data.menu]
    l_submitting = false

    form = {}
  }

  async function delete_menu(id) {
    if (!confirm('Are you sure you want to delete it?')) return
    await api(`menu/${id}`, 'DELETE')
    menus = menus.filter(m => m.id != id)
  }

  onMount(async _ => {
    menus = (await api('menus')).data.menus
  })
</script>

<style>
  form {
    max-width: 300px;
    margin: 0 auto;
  }

  input {
    width: 100% !important;
    margin: 10px 0;

    resize: none;
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card {
    display: inline-flex;

    margin: 0 auto;
  }
</style>
