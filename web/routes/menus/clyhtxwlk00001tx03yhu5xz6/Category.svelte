<main>
  <h1> {category.name} </h1>

  {#each category.items as item}
    <Item {item} />
  {/each}
</main>

<style>
  h1 {
    margin: 40px 0;

    text-align: center;
    color: #652505;
    font-family: 'Enriqueta', sans-serif;
    font-weight: 800;
    font-size: 2.5em;
    letter-spacing: -2px;
  }
</style>

<script>
  import Item from './Item.svelte'
  export let category
</script>
