{#if !component && !error}
  <p> Carregando cardápio... </p>
{:else if component}
  <svelte:component this={component} {menu} />
{:else}
  <p> Cardápio não encontrado </p>
{/if}

<script>
  import clyp7z8db0000cxl6arjgaa23 from './menus/clyp7z8db0000cxl6arjgaa23/Menu.svelte'

  import { onMount } from 'svelte'
  import { api } from '../utils/api.js'

  let component, menu_id, menu, error

  let menu_names = {
   'adeildo-lanches': 'clyp7z8db0000cxl6arjgaa23'
  }

  let components = {
   'clyp7z8db0000cxl6arjgaa23': clyp7z8db0000cxl6arjgaa23
  }

  onMount(async _ => {
    const path = window.location.pathname.split('/').pop()
    menu_id = menu_names[path] || path

    const { res, data } = await api(`menu/${menu_id}`)
    if (!res.ok) return error = 1
    menu = data.menu
    component = components[menu_id]
    if (!component) return error = 1
    document.title = menu.name
  })
</script>

<style>
  p {
    margin-top: 50px;

    text-align: center;
    font-size: 2em;
  }
</style>
