<Modal {show} on:close={close}>
  <h2> {category ? 'Editando' : 'Criando'} uma Categoria </h2>

  <form>
    <label> Nome: <input bind:value={form.name} required /> </label>

    <button on:click={submit} disabled={l_submitting}> {l_submitting ? '...' : 'Enviar'} </button>
  </form>
</Modal>

<script>
  import Modal from './Modal.svelte'

  import { create_category, edit_category } from '../utils/menu-management.js'

  export let show, category
  let l_submitting
  let form

  function close() { show = false }

  async function submit() {
    l_submitting = true

    if (category) edit_category(category.id, form)
    else          create_category(form)
    close()
  }

  function mount() {
    l_submitting = false
    form = {}

    if (category) form.name = category.name
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
