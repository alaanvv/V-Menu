{#if !component && !error}
  Carregando...
{:else if component}
  <svelte:component this={component} {menu} />
{:else}
  Cardápio não encontrado
{/if}

<script>
  import m_clyhtxwlk00001tx03yhu5xz6 from './menus/clyhtxwlk00001tx03yhu5xz6/Menu.svelte'

  import { onMount } from 'svelte'
  import { api } from '../utils/api.js'

  let components = {
   'clyhtxwlk00001tx03yhu5xz6': m_clyhtxwlk00001tx03yhu5xz6
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
