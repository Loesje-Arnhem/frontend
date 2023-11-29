import { gql } from '~/graphql/__generated__'

export const seo = gql(`
  fragment seo on PostTypeSEO {
    metaDesc
    opengraphUrl
    title
    schema {
      raw
    }
  }
`)

export const taxonomySeo = gql(`
  fragment taxonomySeo on TaxonomySEO {
    metaDesc
    opengraphUrl
    title
    schema {
      raw
    }
  }
`)
