{#if show}
  <Modal {show} on:close={close}>
    <h2 class='special tac'> {subcategory ? `Subcategoria: ${subcategory.name}` : 'Criando uma Subcategoria'} </h2>

    <form>
      <label> Nome: <input bind:value={form.name} required /> </label>

      <button class='grn' on:click={submit} disabled={l_submitting}> {l_submitting ? '...' : (subcategory ? 'Editar' : 'Criar')} </button>
      <button class='red' style='margin-top: 10px;' on:click={close} disabled={l_submitting}> Cancelar </button>
    </form>
  </Modal>
{/if}

<script>
  import Modal from './Modal.svelte'

  import { create_subcategory, edit_subcategory } from '../utils/menu-management.js'

  export let show, subcategory, category_id
  let l_submitting
  let form

  function close() { show = false }

  async function submit() {
    l_submitting = true

    if (subcategory) await edit_subcategory(subcategory.id, form)
    else             await create_subcategory(category_id, form)
    close()
  }

  function mount() {
    l_submitting = false
    form = { name: subcategory?.name }
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
