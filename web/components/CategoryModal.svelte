<Modal {show} on:close={close}>
  <h2 class='special tac'> {category ? `Categoria: ${category.name}` : 'Criando uma categoria'} </h2>

  <form>
    <label> Nome: <input bind:value={form.name} required /> </label>

    <button class='grn' on:click={submit} disabled={l_submitting}> {l_submitting ? '...' : (category ? 'Editar' : 'Criar')} </button>
    <button class='red' style='margin-top: 10px;' on:click={close} disabled={l_submitting}> Cancelar </button>
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

    if (category) await edit_category(category.id, form)
    else          await create_category(form)
    close()
  }

  function mount() {
    l_submitting = false
    form = { name: category?.name }
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
