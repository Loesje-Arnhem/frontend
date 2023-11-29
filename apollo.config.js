import { apiUrl } from './data/siteDetails'

module.exports = {
  client: {
    service: {
      name: 'loesje',
      url: `${apiUrl}graphql`,
    },
    includes: ['graphql/**/*.gql'],
  },
}
