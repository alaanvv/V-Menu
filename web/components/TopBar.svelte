<div class='usn tac topbar'>
  <ul class='row'>
    <TopBarItem page='menu'  name='Cardápio' i='restaurant_menu' />
    <TopBarItem page='items' name='Produtos' i='lunch_dining' />
  </ul>
</div>

<script>
  import TopBarItem from '../components/TopBarItem.svelte'
</script>

<style>
  .topbar {
    background: var(--bg0);
  }

  ul {
    justify-content: center;
    gap: 40px;

    padding: 20px 0;
    margin: 0;
  }
  ul :global(li) {
    border-radius: 5px;
    padding: 10px;

    cursor: pointer;
  }
  ul :global(li:hover) {
    background: var(--bg0);
  }
  ul :global(li.active) {
    background: var(--bg1);
    color: var(--fg1) !important;
  }

  @supports (-webkit-touch-callout: none) {
    .topbar { padding-top: 80px; }
  }
</style>
