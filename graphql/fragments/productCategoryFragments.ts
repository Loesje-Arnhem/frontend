import { gql } from '~/graphql/__generated__'

export const productCategory = gql(`
  fragment productCategory on ProductCategory {
    id
    databaseId
    title: name
    content: description
    seo {
      ...taxonomySeo
    }
  }
`)

export const categoryFields = gql(`
  fragment categoryFields on ProductCategory {
    id
    name
    uri
    menuOrder
  }
`)
