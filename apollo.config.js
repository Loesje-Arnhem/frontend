module.exports = {
  client: {
    service: {
      name: 'loesje',
      url: 'https://winkeltje.loesje.nl/graphql',
      // url: 'http://localhost:8080/graphql',
    },
    includes: ['graphql/**/*.gql'],
  },
}
