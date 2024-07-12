<TopBar />

<div class='page'>
  {#if      $menu && $curr_page == 'menu'}  <MenuEdit />
  {:else if $menu && $curr_page == 'items'} <ItemsEdit />
  {/if}
</div>

<script>
  import TopBar    from './components/TopBar.svelte'
  import MenuEdit  from './routes/MenuEdit.svelte'
  import ItemsEdit from './routes/ItemsEdit.svelte'

  import { curr_page, menu } from './store.js'
  import { api } from './utils/api'
  import { onMount } from 'svelte'

  if (!$curr_page) curr_page.set('menu')

  onMount(async _ => {
    if (!$menu)
      menu.set((await api(`menu/clyhtxwlk00001tx03yhu5xz6`)).data.menu)
  })
</script>

<style>
  .page {
    padding: 40px;
    margin: 20px;

    background: var(--bg0);
    border-radius: 10px;

    overflow-y: scroll;
  }
</style>
