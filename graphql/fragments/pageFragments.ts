import { gql } from '~/graphql/__generated__'

export const PageBase = gql(`fragment PageBase on Page {
  id
  databaseId
  title
}
`)

export const RelatedPage = gql(`fragment RelatedPage on Page {
  ...PageBase
  excerpt
  uri
}
`)

export const RelatedPageNode =
  gql(`fragment RelatedPageNode on PageToPageConnectionEdge {
  node {
    ...RelatedPage
  }
}
`)

export const RelatedPages = gql(`fragment RelatedPages on PageToPageConnection {
  edges {
    ...RelatedPageNode
  }
}
`)

export const PageRelatedProduct =
  gql(`fragment PageRelatedProduct on Page_Relatedproductsgroup_relatedProductsProducts_Product {
  ...RelatedProduct
}
`)

export const PageRelatedProductNode =
  gql(`fragment PageRelatedProductNode on Page_Relatedproductsgroup_relatedProductsProducts {
  ... on Page_Relatedproductsgroup_relatedProductsProducts {
    product {
      ...PageRelatedProduct
    }
  }
}
`)

export const PageRelatedProducts =
  gql(`fragment PageRelatedProducts on Page_Relatedproductsgroup {
  title: relatedProductsTitle
  products: relatedProductsProducts {
    ...PageRelatedProductNode
  }
}
`)

export const PageDetails = gql(`fragment PageDetails on Page {
  ...PageBase
  content
  featuredImage {
    ...FeaturedImage
  }
  videoGroup {
    youtubeId
  }
  relatedPages {
    ...RelatedPages
  }
  relatedPostersGroup {
    title: relatedPostersTitle
  }
  relatedPosters(first: 7) {
    ...RelatedPosters
  }
  relatedProducts: relatedProductsGroup {
    ...PageRelatedProducts
  }
  seo {
    ...seo
  }
}
`)
