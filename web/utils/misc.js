export function minify_text(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '')
}

export function format_price(n) {
  let str = String(n / 100).replace('.', ',')
  if      (n % 100 == 0) str += ',00'
  else if (n % 10  == 0) str += '0'
  return str
}
