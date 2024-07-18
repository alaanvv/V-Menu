<div>
{#if show}
  <Modal {show} on:close={close}>
    {#if qr}
      <img src={qr} alt='QR Code' />

      <a href={qr} download={`qr-${format_name($menu.name)}`}> <Button class='grn' t='Baixar Imagem' i='download' /> </a>
      <Button i='close' t='Fechar' action={close} />
    {/if}
  </Modal>
{/if}
</div>

<script>
  import Button from './Button.svelte'
  import Modal  from './Modal.svelte'

  import { onMount } from 'svelte'
  import { menu } from '../store.js'
  import QRCode from 'qrcode'

  export let show
  let qr

  let menu_names = {
   'clyp7z8db0000cxl6arjgaa23': 'adeildo-lanches'
  }

  function close() { show = false }

  function format_name(name) {
    return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll(' ', '-')
  }

  onMount(async _ => {
    qr = await QRCode.toDataURL(`${window.location}cardapio/${menu_names[$menu.id]}`)
  })
</script>

<style>
  img {
    image-rendering: pixelated;
  }

  a {
    text-decoration: none;
  }

  div :global(button) {
    width: 100%;
    margin-top: 10px;
  }
</style>
