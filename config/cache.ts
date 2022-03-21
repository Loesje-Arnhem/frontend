export default {
  useHostPrefix: true,
  key(route: string) {
    if (route === '/') {
      return 'page:home:string'
    }
    const page = route.substring(1).split('/')
    const pageKey = page.join('.')
    return `page:${pageKey}:string`
  },
  store: {
    type: 'memory',
    max: 100,
    ttl: 60 * 10,
  },
}
