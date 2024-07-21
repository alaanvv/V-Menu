import { session_id } from '../store'
import { get } from 'svelte/store'

export async function api(route, method, body) {
  const options = { headers: {}, method: method || 'GET' }

  if (get(session_id))
    options.headers['Authorization'] = `Bearer ${get(session_id)}`
  else if (localStorage.getItem('session_id'))
    options.headers['Authorization'] = `Bearer ${localStorage.getItem('session_id')}`

  if (body) {
    options.body = JSON.stringify(body)
    options.headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(`/${route}`, options)
  let data

  if (res.headers?.get('content-type')?.includes('application/json'))
    data = await res.json()

  return { res, data }
}
