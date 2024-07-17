{#if !component && !error}
  Carregando...
{:else if component}
  <svelte:component this={component} {menu} />
{:else}
  Cardápio não encontrado
{/if}

<script>
  import m_clyp7z8db0000cxl6arjgaa23 from './menus/clyp7z8db0000cxl6arjgaa23/Menu.svelte'

  import { onMount } from 'svelte'
  import { api } from '../utils/api.js'

  let components = {
   'clyp7z8db0000cxl6arjgaa23': m_clyp7z8db0000cxl6arjgaa23
  }
  let component, menu_id, menu, error

  onMount(async _ => {
    menu_id = window.location.pathname.split('/').pop()

    const { res, data } = await api(`menu/${menu_id}`)
    if (!res.ok) return error = 1
    menu = data.menu
    component = components[menu_id]
    if (!component) return error = 1
  })
</script>
