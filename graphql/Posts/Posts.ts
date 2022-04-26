import { gql } from '@apollo/client/core'
import postBase from './Fragments/PostBase'
import postDetails from './Fragments/PostDetails'
import { TOTAL_PAGES } from './../../data/generate'
import { PAGE_SIZE_POSTS } from './../../data/pageSizes'
import postListItem from './Fragments/PostListItem'

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

export const getRelatedPosts = gql`
  query RelatedPosts($after: String, $notIn: ID) {
    posts(first: ${PAGE_SIZE_POSTS}, after: $after, where: { notIn: [$notIn] }) {
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
