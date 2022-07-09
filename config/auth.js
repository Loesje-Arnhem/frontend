export default {
  strategies: {
    graphql: {
      scheme: '~/schemes/graphqlSchemes.js',
    },
  },
  redirect: {
    login: '/winkeltje/inloggen',
    logout: '/winkeltje/inloggen?logout=true',
    callback: false,
    home: '/winkeltje/mijn-account',
  },
}
