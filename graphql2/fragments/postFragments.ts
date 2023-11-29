import { gql } from '~/types/__generated__'

export const PostBase = gql(`
fragment PostBase on Post {
  id
  databaseId
  date
  title
}
`)

export const PostListItem = gql(`
fragment PostListItem on Post {
  ...PostBase
  excerpt
  slug
}
`)

export const PostListItemNode = gql(`
  fragment PostListItemNode on RootQueryToPostConnectionEdge {
  node {
    ...PostListItem
  }
}
`)

export const PostListItems = gql(`
  fragment PostListItems on RootQueryToPostConnection {
    edges {
      ...PostListItemNode
    }
  }
`)

export const PostRelatedProduct = gql(`
  fragment PostRelatedProduct on Post_Relatedproductsgroup_relatedProductsProducts_Product {
  ...RelatedProduct
}
`)

export const PostRelatedProductNode = gql(`
  fragment PostRelatedProductNode on Post_Relatedproductsgroup_relatedProductsProducts {
  ... on Post_Relatedproductsgroup_relatedProductsProducts {
    product {
      ...PostRelatedProduct
    }
  }
}
`)

export const PostRelatedProducts = gql(`
  fragment PostRelatedProducts on Post_Relatedproductsgroup {
  title: relatedProductsTitle
  products: relatedProductsProducts {
    ...PostRelatedProductNode
  }
}
`)

export const PostDetails = gql(`
fragment PostDetails on Post {
  ...PostBase
  content
  videoGroup {
    youtubeId
  }
  featuredImage {
    ...FeaturedImage
  }
  relatedPostersGroup {
    title: relatedPostersTitle
  }
  relatedPosters(first: 7) {
    ...RelatedPosters
  }
  relatedProducts: relatedProductsGroup {
    ...PostRelatedProducts
  }
  seo {
    ...seo
  }
}
`)
