export default function(context) {
  return {
    httpEndpoint: 'https://api.loesje.michielkoning.nl/graphql',
    httpLinkOptions: {
      credentials: 'same-origin',
    },
    wsEndpoint: null,
    tokenName: 'apollo-token',
    persisting: false,
    websocketsOnly: false,
  }
}
