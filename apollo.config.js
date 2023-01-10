module.exports = {
  client: {
    service: {
      name: 'loesje',
      url: 'https://shop.loesje.nl/graphql',
      // url: 'http://localhost:8080/graphql',
    },
    includes: ['graphql/**/*.gql'],
  },
}
