<div class='background'>
  <main>
    <img src={`../../../img/${menu.id}/banner.png`} alt='banner' />

    {#each menu.categories[0].subcategories as category}
      <Category {category} />
    {/each}

    <br> <br> <br> <br>
  </main>
</div>

<style>
  @font-face {
    font-family: 'Enriqueta';
    src: url('../../../font/clyp7z8db0000cxl6arjgaa23/Enriqueta.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Sarabun';
    src: url('../../../font/clyp7z8db0000cxl6arjgaa23/Sarabun.ttf') format('truetype');
  }

  main {
    max-width: 500px;
    height: 100%;
    margin: 0 auto;

    background-color: #fff2d7 !important;
    box-shadow: 0 0 10px 3px #0000000f !important;
    overflow-y: scroll;
  }

  img {
    width: 100%;
  }

  .background {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;

    width: 100%;
    height: 100%;

    background-color: #f1e5cc !important;
  }
</style>

<script>
  import Category from './Category.svelte'
  export let menu

  document.title = menu.name
</script>
