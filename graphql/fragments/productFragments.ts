import { gql } from '~/graphql/__generated__'

export const RelatedProduct = gql(`
  fragment RelatedProduct on Product {
    ...Product
  }
`)

export const Product = gql(`fragment Product on Product {
    ... on SimpleProduct {
      slug
      id
      databaseId
      title: name
      featuredImage {
        ...FeaturedImage
      }
      regularPrice
      price
      salePrice
    }
    ... on VariableProduct {
      slug
      id
      databaseId
      title: name
      featuredImage {
        ...FeaturedImage
      }
      regularPrice
      price
      salePrice
    }  
}
`)
export const GalleryImages =
  gql(`fragment GalleryImages on ProductToMediaItemConnection {
  edges {
    node {
      ...MediaItem
    }
  }
}
`)

export const ProductDetails = gql(`fragment ProductDetails on Product {

  ... on SimpleProduct {
    slug
    id
    databaseId
    title: name
    featuredImage {
      ...FeaturedImage
    }
    regularPrice
    price
    salePrice
  }
  ... on VariableProduct {
    slug
    id
    databaseId
    title: name
    featuredImage {
      ...FeaturedImage
    }
    regularPrice
    price
    salePrice
  } 

#   shortDescription
#   description
#   globalAttributes {
#     nodes {
#       id
#       name
#       slug
#       variation
#       position
#       scope
#       attributeId
#       visible
#       terms {
#         nodes {
#           id
#           databaseId
#           name
#           slug
#           count
#         }
#       }
#     }
#   }
#   galleryImages {
#     ...GalleryImages
#   }
}
`)
