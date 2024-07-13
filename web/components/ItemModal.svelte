{#if show}
  <Modal {show} on:close={close}>
    <h2> {id ? 'Editando' : 'Criando'} um Produto </h2>

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

  import { api } from '../utils/api.js'
  import { menu } from '../store.js'

  export let show, id, subcategory_id
  let l_submitting
  let form = {}

  function close() { show = false }

  async function submit() {
    l_submitting = true

    form.price_in_cents = Math.round(form.price * 100)

    if (id) {
      await api(`item/${id}`, 'PUT', form)

      const new_menu = $menu
      for (let i in new_menu.categories)
        if (new_menu.categories[i].subcategories.find(sc => sc.id == subcategory_id))
          for (let j in new_menu.categories[i].subcategories)
            if (new_menu.categories[i].subcategories[j].id == subcategory_id)
              new_menu.categories[i].subcategories[j].items = new_menu.categories[i].subcategories[j].items.map(i => i.id != id ? i : { ...i, ...form })

      menu.set(new_menu)
      close()
    } else {
      const { data } = await api(`item/${subcategory_id}`, 'POST', form)

      const new_menu = $menu
      for (let i in new_menu.categories)
        if (new_menu.categories[i].subcategories.find(sc => sc.id == subcategory_id))
          for (let j in new_menu.categories[i].subcategories)
            if (new_menu.categories[i].subcategories[j].id == subcategory_id)
              new_menu.categories[i].subcategories[j].items = [...new_menu.categories[i].subcategories[j].items, data.item]

      menu.set(new_menu)
      close()
    }
  }

  function mount() {
    l_submitting = false
    form = {}
    if (id) {
      const category = $menu.categories.find(c => c.subcategories.find(sc => sc.id == subcategory_id))
      const subcategory = category.subcategories.find(sc => sc.id == subcategory_id)
      const item = subcategory.items.find(i => i.id == id)

      form.name = item.name
      form.description = item.description
      form.price = item.price_in_cents / 100
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
