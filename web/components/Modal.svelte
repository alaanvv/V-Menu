<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='modal' on:click={background_click}>
  <div class='modal-content'> <slot /> </div>
</div>

<script>
  import { onMount, createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let show

  function close() {
    dispatch('close')
    show = false
  }

  function background_click(e) {
    if (e.target.classList.contains('modal'))
      close()
  }

  onMount(_ => {
    function on_keydown(e) { if (e.key == 'Escape') close() }
    window.addEventListener('keydown', on_keydown)
    return _ => { window.removeEventListener('keydown', on_keydown) }
  })
</script>

<style>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    display: flex;
    flex-direction: column;

    width: 400px;
    max-width: 80%;
    padding: 20px;
    border-radius: 5px;
    max-height: 70%;

    background-color: var(--bg0);
    overflow: auto;
  }
</style>
