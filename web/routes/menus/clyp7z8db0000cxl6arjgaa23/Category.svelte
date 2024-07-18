<main>
  <div class='images'>
    {#each images[plain_name] || [] as image}
      <img class='img' src={`/img/${menu.id}/${image}.png`} alt=''>
    {/each}
  </div>

  <h1> {category.name} </h1>

  {#each category.items as item}
    <Item {item} {category} {menu} />
  {/each}
</main>

<script>
  import Item from './Item.svelte'

  import { minify_text } from '../../../utils/misc.js'

  export let category, menu

  const images = {
    'acrescimos': ['a1', 'a2'],
    'bebidas':    ['b1', 'b2'],
  }

  const plain_name = minify_text(category.name)
</script>
