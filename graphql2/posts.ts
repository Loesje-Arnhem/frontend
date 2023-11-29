import { gql } from '~/types/__generated__'

export const GetPost = gql(`
  query GetPost($slug: ID!) {
    post(id: $slug, idType: URI) {
      ...PostDetails
    }
  }
`)

export const GetPosts = gql(`
  query GetPosts($after: String, $notIn: ID) {
    posts(
      first: 10
      after: $after
      where: { notIn: [$notIn], hasPassword: false }
    ) {
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
      ...PostListItems
    }
  }
`)
