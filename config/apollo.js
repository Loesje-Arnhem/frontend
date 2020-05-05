import { apiUrl } from './../data/siteDetails'

export default {
  clientConfigs: {
    default: {
      // required
      httpEndpoint: `${apiUrl}graphql`,
      httpLinkOptions: {
        credentials: 'same-origin',
      },
      wsEndpoint: null,
      tokenName: 'apollo-token',
      persisting: false,
      websocketsOnly: false,
    },
  },
}
