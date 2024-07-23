{#if show}
  <Modal {show} on:close={close}>
    <h2> Editando </h2>

    <form>
      <label> Nome:     <input bind:value={form.name}     required /> </label>
      <label> Telefone: <input bind:value={form.phone}    /> </label>
      <label> Whatsapp: <input bind:value={form.whatsapp} /> </label>
      <label> Endereço: <input bind:value={form.address}  /> </label>
      <label> Rodapé: <textarea rows=5 bind:value={form.footer} /> </label>

      <button class='grn' on:click={submit} disabled={l_submitting}> {l_submitting ? '...' : 'Editar'} </button>
      <button class='red' style='margin-top: 10px;' on:click={close} disabled={l_submitting}> Cancelar </button>
    </form>
  </Modal>
{/if}

<script>
  import Modal from './Modal.svelte'

  import { edit_menu } from '../utils/menu-management.js'
  import { menu } from '../store.js'

  export let show
  let l_submitting
  let form

  function close() { show = false }

  async function submit() {
    l_submitting = true

    await edit_menu(form)
    close()
  }

  function mount() {
    l_submitting = false
    form = {
      name:     $menu.name,
      phone:    $menu.phone,
      whatsapp: $menu.whatsapp,
      address:  $menu.address,
      footer:   $menu.footer
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
