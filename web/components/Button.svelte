<button on:click={action} class={clazz} class:row={i && t} {disabled}>
  {#if i} <Icon {i} /> {/if}
  {#if t} {t}          {/if}
</button>

<script>
  import Icon from './Icon.svelte'

  export let i, t, action, disabled
  export {clazz as class}
  let clazz = ''
</script>
