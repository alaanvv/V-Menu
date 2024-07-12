export async function api(route, method, body) {
  const options = { headers: {}, method: method || 'GET' }

  if (body) {
    options.body = JSON.stringify(body)
    options.headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(`${window.location.origin}/${route}`, options)
  let data

  if (res.headers?.get('content-type')?.includes('application/json'))
    data = await res.json()

  return { res, data }
}
