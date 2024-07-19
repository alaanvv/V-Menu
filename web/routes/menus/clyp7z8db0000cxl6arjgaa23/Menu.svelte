<div class='root'>
  <div class='background'>
    <main>
      <img class='banner' src={`/assets/img/${menu.id}/banner.png`} alt='banner' />

      {#each menu.categories[0].subcategories as category}
        <Category {category} {menu} />
      {/each}

      <footer>
        <p class='tac'>
          {menu.whatsapp} <br>
          Faça seu pedido, <br>
          atendemos todos os dias!
        </p>
      </footer>
      <br> <br> <br> <br>
    </main>
  </div>
</div>

<style>
  @font-face {
    font-family: 'Enriqueta';
    src: url('/assets/font/Enriqueta.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Sarabun';
    src: url('/assets/font/Sarabun.ttf') format('truetype');
  }

  .root {
    --f-header:   'Enriqueta', serif;
    --f-item:     inherit;
    --f-currency: 'Sarabun', sans-serif;
    --f-number:   'Enriqueta', serif;

    --bg0: #f1e5cc !important;
    --bg1: #fff2d7 !important;

    --fg0: #652505;
    --fg1: #904710;
    --fg2: #090d0d;
  }

  .background {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;

    width: 100%;
    height: 100%;

    background-color: var(--bg0);
  }

  main {
    max-width: 500px;
    height: 100%;
    margin: 0 auto;

    background-color: var(--bg1);
    box-shadow: 0 0 10px 3px #0000000f !important;
    overflow-y: scroll;

    text-transform: uppercase;
  }

  footer {
    margin: 80px 0 0 0;

    line-height: 1.3em;
    font-size: 1.3em;
    font-weight: 800;
    color: var(--fg0);
  }

  .banner {
    width: 100%;
  }

  main :global(.images) {
    display: flex;
    justify-content: space-evenly;
  }

  main :global(.images.items-image) {
    margin: 50px 0;
  }

  main :global(.images img) {
    aspect-ratio: 1;
    width: 25%;
    border-radius: 100%;
  }

  main :global(p) {
    margin: 0;
  }

  main :global(h1) {
    margin: 40px 0;

    text-align: center;
    color: var(--fg0);
    font-family: var(--f-header);
    font-weight: 800;
    font-size: 2.5em;
    letter-spacing: -2px;
  }

  main :global(.item) {
    margin: 0 50px 30px 50px;

    font-size: 1.4em;
    font-weight: 800;
    font-family: var(--f-item);
    color: var(--f1);
  }

  main :global(.price) {
    align-self: start;

    color: var(--fg2);
    text-wrap: nowrap;
    font-family: var(--f-currency);
  }

  main :global(.price span) {
    font-family: var(--f-number);
  }

  main :global(.desc) {
    max-width: 70%;

    font-size: 0.8em;
    font-weight: 500;
    color: #343122;
  }

  main :global(.dots) {
    flex-grow: 2;
    align-self: flex-end;

    margin-bottom: 8px;
    border-bottom: dotted 4px;
  }

  @media screen and (max-width: 500px) {
    main :global(.item) {
      margin: 0 20px 30px 20px;
    }
  }

  @media screen and (max-width: 450px) {
    main :global(.item) {
      font-size: 1.2em;
    }
  }

  @media screen and (max-width: 400px) {
    main :global(.item) {
      font-size: 1.1em;
    }
  }
</style>

<script>
  import Category from './Category.svelte'
  export let menu
</script>
