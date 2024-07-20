<!-- svelte-ignore a11y-click-events-have-key-events -->
<li class:active={$curr_page == page} class='row' on:click={enter}> <Icon {i} /> {name} </li>

<script>
  import Icon from './Icon.svelte'

  import { curr_page } from '../store.js'

  export let page, name, i

  function enter() {
    curr_page.set(page)
    document.querySelector('main').scrollTop = 0
  }
</script>
