export default {
  // Setting up cache for 'static' directory - a year in milliseconds
  // https://web.dev/uses-long-cache-ttl
  static: {
    maxAge: 60 * 60 * 24 * 365 * 1000,
  },
  bundleRenderer: {
    shouldPreload: (_, type) => {
      return ['script', 'style', 'font'].includes(type)
    },
  },
}
