import { gql } from '@apollo/client/core'
import pageContent from './Fragments/PageContent'
import { homePageId, shopPageId } from './../../data/pages'
import product from './../Products/Fragments/ProductListItem'

export default gql`
  query PageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      ...pageContent
    }
  }
  ${pageContent}
`

export const GetPageById = gql`
  query GetPageById($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      ...pageContent
    }
  }
  ${pageContent}
`

export const GetPageByHome = gql`
  query GetPageByHome {
    page(id: ${homePageId}, idType: DATABASE_ID) {
      ...pageContent
    }
    posts(first: 3) {
      edges {
        node {
          id
          title
          databaseId
          date
          excerpt
          uri
        }
      }
    }
  }
  ${pageContent}
`

export const GetPageByShop = gql`
  query GetPageByShop {
    page(id: ${shopPageId}, idType: DATABASE_ID) {
      ...pageContent
    }
    products(where: {featured: true}, first: 99) {
      edges {
        node { 
          ...product
        }
      }
    }
  }
  ${pageContent}
  ${product}
`

export const GetPages = gql`
  query Pages {
    pages(first: 99) {
      edges {
        node {
          ...pageContent
          uri
        }
      }
    }
  }
  ${pageContent}
`
