{#if show}
  <Modal {show} on:close={close}>
    <h2> {id ? 'Editando' : 'Criando'} uma Subcategoria </h2>

    <form>
      <label> Nome: <input bind:value={form.name} required /> </label>

      <button on:click={submit} disabled={l_submitting}> {l_submitting ? '...' : 'Enviar'} </button>
    </form>
  </Modal>
{/if}

<script>
  import Modal from './Modal.svelte'

  import { create_subcategory, edit_subcategory } from '../utils/menu-management.js'
  import { menu } from '../store.js'

  export let show, id, category_id
  let l_submitting
  let form = {}

  function close() { show = false }

  async function submit() {
    l_submitting = true

    if (id) edit_subcategory(id, form)
    else    create_subcategory(category_id, form)
    close()
  }

  function mount() {
    l_submitting = false
    form = {}
    if (id)
      form.name = $menu.categories.find(c => c.id == category_id)?.subcategories.find(sc => sc.id == id)?.name
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
