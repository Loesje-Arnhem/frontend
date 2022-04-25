import { gql } from '@apollo/client/core'
import postBase from './Fragments/PostBase'
import postDetails from './Fragments/PostDetails'
import { TOTAL_PAGES } from './../../data/generate'

export const getPosts = gql`
  query Posts($first: Int, $after: String, $notIn: ID) {
    posts(first: $first, after: $after, where: { notIn: [$notIn] }) {
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          ...postBase
          excerpt
          uri
        }
      }
    }
  }
  ${postBase}
`

export const getPost = gql`
  query Post($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...postDetails
    }
  }
  ${postDetails}
`

export const GetAllPosts = gql`
  query Posts($after: String) {
    posts(first: ${TOTAL_PAGES}, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...postDetails
          slug
        }
      }
    }
  }
  ${postDetails}
`
