import { createIPX, createIPXMiddleware } from 'ipx'

// https://github.com/unjs/ipx
const ipx = createIPX({
  dir: '', // absolute path to images dir
  domains: ['www.loesje.nl', 'test.loesje.nl', 'localhost:5000'], // allowed external domains (should match domains option in nuxt.config)
  alias: {}, // base alias
  sharp: {}, // sharp options
})

export default createIPXMiddleware(ipx)
