{#if show}
  <Modal on:close={close}>
    <h2> {id ? 'Editando' : 'Criando'} uma Categoria </h2>

    <form>
      <label> Nome: <input bind:value={form.name} required /> </label>

      <button on:click={submit} disabled={l_submitting}> {l_submitting ? '...' : 'Enviar'} </button>
    </form>
  </Modal>
{/if}

<script>
  import Modal from './Modal.svelte'

  import { api } from '../utils/api.js'
  import { menu } from '../store.js'

  export let show, id
  let l_submitting
  let form = {}

  function close() { show = false }

  async function submit() {
    l_submitting = true

    if (id) {
      await api(`category/${id}`, 'PUT', form)
      menu.set({ ...$menu, categories: $menu.categories.map(c => c.id == id ? { ...c, ...form } : c) })
      close()
    } else {
      const { data } = await api(`category/${$menu.id}`, 'POST', form)
      menu.set({ ...$menu, categories: [...$menu.categories, data.category] })
      close()
    }
  }

  function mount() {
    l_submitting = false
    form = {}
    if (id)
      form.name = $menu.categories.find(c => c.id == id)?.name
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
