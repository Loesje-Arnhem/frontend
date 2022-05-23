import { gql } from '@apollo/client/core'
import subjectDetails from '../Posters/Fragments/SubjectDetails'
import sourceDetails from '../Posters/Fragments/SourceDetails'
import pageContent from './Fragments/PageContent'
import { postsPageId, homePageId, shopPageId } from './../../data/pages'
import product from './../Products/Fragments/ProductListItem'
import { TOTAL_PAGES } from './../../data/generate'
import postListItem from './../Posts/Fragments/PostListItem'
import { PAGE_SIZE_POSTERS, PAGE_SIZE_POSTS_HOME } from './../../data/pageSizes'
import page from './Fragments/Page'

export default gql`
  query PageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      ...pageContent
      relatedPages {
        edges {
          node {
            ...page
            excerpt
            uri
          }
        }
      }
    }
  }
  ${pageContent}
  ${page}
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
    posts(first: ${PAGE_SIZE_POSTS_HOME}) {
      edges {
        node {
        ...postListItem
        }
      }
    }
  }
  ${pageContent}
  ${postListItem}
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

export const GetPageByPosts = gql`
  query GetPageByPosts {
    page(id: ${postsPageId}, idType: DATABASE_ID) {
      ...pageContent
    }
 

   posts(first: 20) {
      pageInfo {
        endCursor
       hasNextPage
    }      
      edges {
        node {
        ...postListItem
        }
      }
    }
  }
  ${postListItem}
  ${pageContent}
  ${product}
`

export const GetPageByPosters = gql`
  query GetPageByPosters {
    posters(first: ${PAGE_SIZE_POSTERS}) {
      pageInfo {
        endCursor
         hasNextPage
      }      
      edges {
        node {
          id
          databaseId
          title
          uri
          slug
          featuredImage {
            node {
              id
              medium: sourceUrl(size: MEDIUM)
            }
          }
        }
      }
    }
    sources(first: 100) {
      edges {
        node {
          ...sourceDetails
        }
      }
    }
    subjects(first: 100) {
      edges {
        node {
          ...subjectDetails
        }
      }
    }    
  }
  ${subjectDetails},
  ${sourceDetails}
`

export const GetAllPages = gql`
  query Pages($after: String) {
    pages(first: ${TOTAL_PAGES}, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...pageContent
          uri
          relatedPages {
            edges {
              node {
                ...page
                excerpt
                uri
              }
            }
          }
        }
      }
      
    }
  }
  ${pageContent}
`
