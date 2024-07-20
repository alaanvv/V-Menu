{#if component} <svelte:component this={component} {menu} />
{:else}         <p> {message} </p>
{/if}

<script>
  import adeildo_lanches from './menus/adeildo-lanches/Menu.svelte'
  import { onMount } from 'svelte'
  import { api } from '../utils/api.js'

  let component, menu, message = 'Carregando cardápio...'

  onMount(async _ => {
    const components = {
      'adeildo-lanches': adeildo_lanches
    }

    const path = window.location.pathname.split('/').pop()

    const { res, data } = await api(`menu-by-path/${path}`)
    component = components[path]

    if (!res.ok || !component) return message = 'Cardápio não encontrado'

    menu = data.menu
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
