import gql from 'graphql-tag'
import selectedTagsQuery from '~/graphql/local/SelectedTags.gql'

export const typeDefs = gql`
  extend type Item {
    id: ID!
    tagId: Int
    text: String
  }
  extend type Mutation {
    changeItem(id: ID!): Boolean
    deleteItem(id: ID!): Boolean
    addItem(text: String!): Item
  }
`

const resolvers = {
  Mutation: {
    addItem: (_, { id, tagId, text }, { cache }) => {
      const data = cache.readQuery({ query: selectedTagsQuery })
      const newItem = {
        __typename: 'Tag',
        id,
        tagId,
        text
      }
      data.selectedTags.push(newItem)
      cache.writeQuery({ query: selectedTagsQuery, data })
      return newItem
    },

    deleteItem: (_, { id }, { cache }) => {
      const data = cache.readQuery({ query: selectedTagsQuery })
      const currentItem = data.selectedTags.find(item => item.id === id)
      data.selectedTags.splice(data.selectedTags.indexOf(currentItem), 1)
      cache.writeQuery({ query: selectedTagsQuery, data })
      return true
    }
  }
}

const clientState = {
  // Set initial local state.
  defaults: {
    selectedTags: []
  },
  resolvers
}

export default function(context) {
  return {
    httpEndpoint: 'https://api.loesje.michielkoning.nl/graphql',
    httpLinkOptions: {
      credentials: 'same-origin'
    },
    wsEndpoint: null,
    tokenName: 'apollo-token',
    persisting: false,
    websocketsOnly: false,
    // return the client state
    clientState
  }
}
