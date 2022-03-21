export default {
  useHostPrefix: true,
  pages: ['/'],
  key(route) {
    if (route === '/') {
      return 'page:home:string'
    }
    let page = route.substr(1).split('/')
    page = page.join('.')
    return `page:${page}:string`
  },
  store: {
    type: 'memory',
    max: 100,
    ttl: 60 * 10,
  },
}
