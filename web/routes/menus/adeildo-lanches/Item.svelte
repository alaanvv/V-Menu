{#if image_i != undefined}
  <div class='images items-image'>
    {#each images[plain_name][image_i] || [] as image}
      <img src={`/assets/img/${menu.path}/${image}.png`} alt=''>
    {/each}
  </div>
{/if}

<div class='item'>
  <div class='row jcsb'>
    <p class='name'> {item.name} </p>
    {#if !item.description} <div class='dots' /> {/if}
    <p class='price'> <span> R$ </span> {format_price(item.price_in_cents)} </p>
  </div>
  {#if item.description}
    <p class='desc'> {item.description} </p>
  {/if}
</div>

<script>
  import { minify_text, format_price } from '../../../utils/misc.js'

  export let item, category, menu
  let image_i

  const images = {
    'hamburgueres': [['h1', 'h2'], ['h3', 'h4'], ['h5', 'h6']]
  }

  const plain_name = minify_text(category.name)
  const image_offset = Math.ceil(category.items.length / (images[plain_name]?.length + 1))
  const i = category.items.findIndex(i => i.id == item.id)

  if (images[plain_name] && i % image_offset == 0 && i)
    image_i = (i / image_offset) - 1
</script>
