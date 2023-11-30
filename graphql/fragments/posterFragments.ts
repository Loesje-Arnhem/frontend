import { gql } from '~/graphql/__generated__'

export const PosterBase = gql(`fragment PosterBase on Poster {
  id
  databaseId
  title
}
`)

export const Poster = gql(`fragment Poster on Poster {
  ...PosterBase
  uri
  slug
  featuredImage {
    ...FeaturedImage
  }
}`)

export const RelatedPosterNode =
  gql(`fragment RelatedPosterNode on ContentNodeToPosterConnectionEdge {
  node {
    ...Poster
  }
}
`)

export const RelatedPosters =
  gql(`fragment RelatedPosters on ContentNodeToPosterConnection {
  edges {
    ...RelatedPosterNode
  }
}`)

export const PosterRelatedProduct =
  gql(`fragment PosterRelatedProduct on Poster_Relatedproductsgroup_relatedProductsProducts_Product {
  ...Product
}`)

export const PosterRelatedProductNode =
  gql(`fragment PosterRelatedProductNode on Poster_Relatedproductsgroup_relatedProductsProducts {
    ... on Poster_Relatedproductsgroup_relatedProductsProducts {
    product {
      ... on SimpleProduct {
        databaseId
      }
      ... on VariableProduct {
        databaseId
      }  
    }
  }
}`)

export const PosterRelatedProducts =
  gql(`fragment PosterRelatedProducts on Poster_Relatedproductsgroup {
  title: relatedProductsTitle
  products: relatedProductsProducts {
    ...PosterRelatedProductNode
  }
}`)

export const PosterDetails = gql(`fragment PosterDetails on Poster {
  ...PosterBase
  slug
  date
  uri
  link
  featuredImage {
    ...FeaturedImage
  }
  PosterMetaGroup {
    date
    pdf {
      mediaItemUrl
    }
  }
  sources {
    ...Sources
  }
  subjects {
    ...Subjects
  }
  seo {
    ...seo
  }
  relatedProducts: relatedProductsGroup {
    ...PosterRelatedProducts
  }
}`)

export const PosterNode =
  gql(`fragment PosterNode on RootQueryToPosterConnectionEdge {
  node {
    ...Poster
  }
}`)

export const Posters = gql(`fragment Posters on RootQueryToPosterConnection {
  edges {
    ...PosterNode
  }
}`)
