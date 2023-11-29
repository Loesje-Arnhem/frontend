import { gql } from '~/graphql/__generated__'

export const GetPoster = gql(`
  query GetPoster($slug: ID!) {
    poster(id: $slug, idType: SLUG) {
      ...PosterDetails
      # relatedProducts: relatedProductsGroup {
      #   ...posterRelatedProducts
      # }


      seo {
        ...seo
      }
    }
  }
`)

export const SearchPoster = gql(`
  query SearchPoster($search: String) {
    posters(where: { search: $search }, first: 10) {
      edges {
        node {
          ...PosterBase
          slug
        }
      }
    }
  }
`)

export const GetPosters = gql(`
  query GetPosters(
    $after: String
    $where: RootQueryToPosterConnectionWhereArgs
  ) {
    posters(first: 20, after: $after, where: $where) {
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
      ...Posters
    }
  }
`)
