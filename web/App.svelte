<TopBar />

<main>
  {#if loading}
    Carregando...
  {:else}
    {#if      $menu && $curr_page == 'menu'}        <MenuEdit />
    {:else if $menu && $curr_page == 'items'}       <ItemsEdit />
    {:else if          $curr_page == 'login'}       <Login />
    {:else if          $curr_page == 'admin'}       <AdminPanel />
    {/if}
  {/if}
</main>

<script>
  import AdminPanel from './routes/AdminPanel.svelte'
  import ItemsEdit  from './routes/ItemsEdit.svelte'
  import MenuEdit   from './routes/MenuEdit.svelte'
  import TopBar     from './components/TopBar.svelte'
  import Login      from './routes/Login.svelte'

  import { session_id, curr_page, menu } from './store.js'
  import { api } from './utils/api.js'
  import { onMount } from 'svelte'

  let loading

  onMount(async _ => {
    loading = true
    const _session_id = localStorage.getItem('session_id')
    if (!_session_id) return loading = false

    const { res, data } = await api(`menu-from-session/${_session_id}`)
    loading = false
    if (!res.ok) return

    session_id.set(_session_id)
    menu.set(data.menu)
  })

  $: {
    if      (!$session_id && $curr_page != 'admin') curr_page.set('login')
    else if ($curr_page == 'login' || !$curr_page)  curr_page.set('items')
  }
</script>

<style>
  main {
    padding: 40px;
    margin: 20px;

    background: var(--bg0);
    border-radius: 10px;

    overflow-y: scroll;
  }

  @media screen and (max-width: 768px) {
    main {
      padding: 1em;
      margin: 20px 0;
      border-radius: 0;

      overflow-x: hidden;

      font-size: 0.9em;
    }
  }
</style>
