<div class='tac'>
  <h2> Invista em profissionalismo  com a <a class='grn' href='mailto:valealan84@gmail.com'> vMenu </a> </h2>
</div>

<div class='hr' />

<form class='tas' on:submit={submit}>
  {#if error} <p class='red'> {error} </p> {/if}

  <label> Nome:
    <input type='text' bind:value={user.username} required />
  </label>

  <label> Senha:
    <div class='password-container'>
      <input type='password' bind:value={user.password} style='display: {show_password ? 'none' : 'block'};' />
      <input type='text'     bind:value={user.password} style='display: {show_password ? 'block' : 'none'};' />
      <Icon on:click={toggle_show_password} i={show_password ? 'visibility_off' : 'visibility'}  />
    </div>
  </label>

  <button type='submit' disabled={l_submitting}> {l_submitting ? '...' : 'Entrar'} </button>
</form>

<script>
  import Icon from  '../components/Icon.svelte'

  import { session_id, menu } from '../store.js'
  import { api } from '../utils/api.js'

  let user = { username: '', password: '' }
  let error, show_password
  let l_submitting

  function toggle_show_password() { show_password = !show_password }

  async function submit(e) {
    e.preventDefault()

    error = ''
    l_submitting = true
    const { res, data } = await api('login', 'POST', user)
    l_submitting = false

    if (res.ok) {
      localStorage.setItem('session_id', data.session.id)
      session_id.set(data.session.id)
      menu.set(data.session.menu)
      return
    }

    user.username = ''
    user.password = ''
    error = 'Credenciais inválidas'
  }
</script>

<style>
  form {
    max-width: 300px;
    margin: 0 auto;
  }

  input, button {
    width: 100% !important;
    margin: 10px 0;

    resize: none;
  }

  h2 {
    margin-bottom: 20px;
  }

  div {
    margin-bottom: 30px;
  }
</style>
