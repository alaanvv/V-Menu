{#if show}
  <Modal {show} on:close={close}>
    <h2 class='special tac'> {item ? `Produto: ${item.name}` : 'Criando um Produto'} </h2>

    <form>
      <label> Nome:      <input bind:value={form.name} required /> </label>
      <label> Descrição: <textarea rows=5 bind:value={form.description} /> </label>
      <label> Preço:     <input placehloder='R$' rows=5 bind:value={form.price} /> </label>

      <button on:click={submit} disabled={l_submitting}> {l_submitting ? '...' : 'Enviar'} </button>
    </form>
  </Modal>
{/if}

<script>
  import Modal from './Modal.svelte'

  import { create_item, edit_item } from '../utils/menu-management.js'
  import { menu } from '../store.js'

  export let show, item, subcategory_id
  let l_submitting
  let form = {}

  function close() { show = false }

  async function submit() {
    l_submitting = true

    if (!form.description)
      delete form.description
    form.price_in_cents = Math.round(form.price * 100)

    if (item) await edit_item(item.id, form)
    else      await create_item(subcategory_id, form)
    close()
  }

  function mount() {
    l_submitting = false
    form = {}
    if (item) {
      const category = $menu.categories.find(c => c.subcategories.find(sc => sc.id == subcategory_id))
      const subcategory = category.subcategories.find(sc => sc.id == subcategory_id)
      const _item = subcategory.items.find(i => i.id == item.id)

      form.name = _item.name
      form.description = _item.description
      form.price = _item.price_in_cents / 100
    }
  }

  function format_price() {
    form.price = String(form.price).replaceAll(',', '.').replaceAll(/[^\d\.]/g, '')
    const parts = form.price.split('.')
    if (parts.length > 1)
      form.price = `${parts[0]}.${parts.slice(1).join('').slice(0, 2)}`
  }

  $: if (show) mount()
  $: if (form.price) format_price()
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
