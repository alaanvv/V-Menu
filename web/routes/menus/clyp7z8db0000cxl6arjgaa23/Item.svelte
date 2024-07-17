<div class='main'>
  <div class='row jcsb'>
    <p class='name'> {item.name} </p>
    {#if !item.description} <div class='dots' /> {/if}
    <p class='price'> <span> R$ </span> {format_price(item.price_in_cents)} </p>
  </div>
  {#if item.description}
    <p class='desc'> {item.description} </p>
  {/if}
</div>

<style>
  p {
    margin: 0;

    text-transform: uppercase;
  }

  .main {
    margin: 0 50px 30px 50px;

    font-size: 1.4em;
    font-weight: 800;
    color: #904710;
  }

  .price {
    align-self: start;
    color: #090d0d;
    text-wrap: nowrap;
    font-family: 'Sarabun', sans-serif;
  }

  .price span {
    font-family: 'Enriqueta', sans-serif;
  }

  .desc {
    max-width: 70%;

    font-size: 0.8em;
    font-weight: 500;
    color: #343122;
  }

  .dots {
    flex-grow: 2;
    align-self: flex-end;

    margin-bottom: 8px;
    border-bottom: dotted 4px;
  }

  @media screen and (max-width: 500px) {
    .main {
      margin: 0 20px 30px 20px;
    }
  }

  @media screen and (max-width: 450px) {
    .main {
      font-size: 1.2em;
    }
  }

  @media screen and (max-width: 400px) {
    .main {
      font-size: 1.1em;
    }
  }
</style>

<script>
  export let item

  function format_price(n) {
    let str = String(n / 100).replace('.', ',')
    if (n % 100 == 0) str += ',00'
    else if (n % 10 == 0) str += '0'
    return str
  }
</script>
