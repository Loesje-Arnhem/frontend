import { gql } from '~/graphql/__generated__'

export const GetTaxonomies = gql(`
  query GetTaxonomies {
    sources(first: 100) {
      edges {
        node {
          ...Source
        }
      }
    }
    subjects(first: 100) {
      edges {
        node {
          ...Subject
        }
      }
    }
  }
`)
