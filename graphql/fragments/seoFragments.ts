import { gql } from '~/graphql/__generated__'

export const seo = gql(`
  fragment seo on PostTypeSEO {
    metaDesc
    title
  }
`)

export const taxonomySeo = gql(`
  fragment taxonomySeo on TaxonomySEO {
    metaDesc
    title
  }
`)
