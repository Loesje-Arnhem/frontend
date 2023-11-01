export default gql`
query GetPageHome($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    ...PageDetails
  }
  posts(first: 3, where: {hasPassword: false}) {
    ...PostListItems
  }
}
    
    fragment PageDetails on Page {
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
    

    fragment PageBase on Page {
  id
  databaseId
  title
}
    

    fragment FeaturedImage on NodeWithFeaturedImageToMediaItemConnectionEdge {
  node {
    ...MediaItem
  }
}
    

    fragment MediaItem on MediaItem {
  id
  srcSet
  alt: altText
  src: mediaItemUrl
  mediaDetails {
    width
    height
  }
}
    

    fragment RelatedPages on PageToPageConnection {
  edges {
    ...RelatedPageNode
  }
}
    

    fragment RelatedPageNode on PageToPageConnectionEdge {
  node {
    ...RelatedPage
  }
}
    

    fragment RelatedPage on Page {
  ...PageBase
  excerpt
  uri
}
    

    fragment RelatedPosters on ContentNodeToPosterConnection {
  edges {
    ...RelatedPosterNode
  }
}
    

    fragment RelatedPosterNode on ContentNodeToPosterConnectionEdge {
  node {
    ...Poster
  }
}
    

    fragment Poster on Poster {
  ...PosterBase
  uri
  slug
  featuredImage {
    ...FeaturedImage
  }
}
    

    fragment PosterBase on Poster {
  id
  databaseId
  title
}
    

    fragment PageRelatedProducts on Page_Relatedproductsgroup {
  title: relatedProductsTitle
  products: relatedProductsProducts {
    ...PageRelatedProductNode
  }
}
    

    fragment PageRelatedProductNode on Page_Relatedproductsgroup_relatedProductsProducts {
  ... on Page_Relatedproductsgroup_relatedProductsProducts {
    product {
      ...PageRelatedProduct
    }
  }
}
    

    fragment PageRelatedProduct on Page_Relatedproductsgroup_relatedProductsProducts_Product {
  ...Product
}
    

    fragment Product on Product {
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
    

    fragment seo on PostTypeSEO {
  metaDesc
  opengraphUrl
  title
  schema {
    raw
  }
}
    

    fragment PostListItems on RootQueryToPostConnection {
  edges {
    ...PostListItemNode
  }
}
    

    fragment PostListItemNode on RootQueryToPostConnectionEdge {
  node {
    ...PostListItem
  }
}
    

    fragment PostListItem on Post {
  ...PostBase
  excerpt
  slug
}
    

    fragment PostBase on Post {
  id
  databaseId
  date
  title
}
`