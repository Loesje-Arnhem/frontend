import { gql } from '~/types/__generated__'

export const RelatedProduct = gql(`fragment RelatedProduct on Product {
  databaseId
}
`)

export const Product = gql(`fragment Product on Product {
  slug
  id
  databaseId
  title: name
  featuredImage {
    ...FeaturedImage
  }
  ... on SimpleProduct {
    regularPrice
    price
    salePrice
  }
  ... on VariableProduct {
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
  ...Product
  featuredImage {
    ...FeaturedImage
  }
  shortDescription
  description
  globalAttributes {
    nodes {
      id
      name
      slug
      variation
      position
      scope
      attributeId
      visible
      terms {
        nodes {
          id
          databaseId
          name
          slug
          count
        }
      }
    }
  }
  galleryImages {
    ...GalleryImages
  }
}
`)
