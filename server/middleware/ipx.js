import { createIPX, createIPXMiddleware } from 'ipx'

// https://github.com/unjs/ipx
const ipx = createIPX({
  dir: '', // absolute path to images dir
  domains: ['winkeltje.loesje.nl'], // allowed external domains (should match domains option in nuxt.config)
  alias: {}, // base alias
  sharp: {}, // sharp options
})

export default createIPXMiddleware(ipx)
