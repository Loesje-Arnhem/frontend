import gql from 'graphql-tag'
import selectedTagsQuery from '~/graphql/local/SelectedTags.gql'
import searchTextQuery from '~/graphql/local/SearchText.gql'

const typeDefs = gql`
  type SelectedTag {
    id: ID!
    tagId: Int!
  }
  type SearchText {
    searchText: String
  }
  extend type Mutation {
    udpateSearch(search: String): SearchText
    addToSelectedTags(id: ID!, tagId: Int!): SelectedTag
    removeFromSelectedTags(id: ID!): Boolean
  }
`

const resolvers = {
  Mutation: {
    udpateSearchText: (_, { searchText }, { cache }) => {
      const newItem = {
        __typename: 'SearchText',
        searchText
      }
      const data = {
        searchText: newItem
      }
      cache.writeQuery({ query: searchTextQuery, data })
      return newItem
    },
    addToSelectedTags: (_, { id, tagId }, { cache }) => {
      const data = cache.readQuery({ query: selectedTagsQuery })
      const newItem = {
        __typename: 'Tag',
        id,
        tagId
      }
      data.selectedTags.push(newItem)
      cache.writeQuery({ query: selectedTagsQuery, data })
      return newItem
    },

    removeFromSelectedTags: (_, { id }, { cache }) => {
      const data = cache.readQuery({ query: selectedTagsQuery })
      const currentItem = data.selectedTags.find(item => item.id === id)
      data.selectedTags.splice(data.selectedTags.indexOf(currentItem), 1)
      cache.writeQuery({ query: selectedTagsQuery, data })
      return true
    }
  }
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
    resolvers,
    typeDefs,
    onCacheInit: cache => {
      const data = {
        selectedTags: [],
        searchText: {
          __typename: 'SearchText'
        }
      }

      cache.writeData({ data })
    }
  }
}
