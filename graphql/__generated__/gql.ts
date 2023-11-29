/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetCart {\n    cart {\n      ...cartFragment\n    }\n  }\n": types.GetCartDocument,
    "\n  mutation AddToCart($productId: Int!, $quantity: Int) {\n    addToCart(input: { productId: $productId, quantity: $quantity }) {\n      cart {\n        ...cartFragment\n      }\n    }\n  }\n": types.AddToCartDocument,
    "\n  mutation SubmitWorkshop(\n    $address: String\n    $city: String\n    $clientMutationId: String\n    $companyName: String\n    $date: String\n    $email: String\n    $location: String\n    $motivation: String\n    $name: String\n    $phoneNumber: String\n    $theme: String\n    $time: String\n    $totalAttendees: Int\n    $totalWorkshops: Int\n    $zipcode: String\n  ) {\n    requestWorkshop(\n      input: {\n        address: $address\n        city: $city\n        clientMutationId: $clientMutationId\n        companyName: $companyName\n        date: $date\n        email: $email\n        location: $location\n        motivation: $motivation\n        name: $name\n        phoneNumber: $phoneNumber\n        theme: $theme\n        time: $time\n        totalAttendees: $totalAttendees\n        totalWorkshops: $totalWorkshops\n        zipcode: $zipcode\n      }\n    ) {\n      response\n    }\n  }\n": types.SubmitWorkshopDocument,
    "\n  fragment cartFragment on Cart {\n    contents {\n      nodes {\n        key\n        product {\n          node {\n            id\n            databaseId\n            name\n            image {\n              id\n              altText\n              thumbnail: sourceUrl(size: THUMBNAIL)\n              medium: sourceUrl(size: MEDIUM)\n              mediumLarge: sourceUrl(size: MEDIUM_LARGE)\n            }\n            ... on SimpleProduct {\n              id\n              regularPrice\n              price\n              salePrice\n            }\n            ... on VariableProduct {\n              id\n              regularPrice\n              price\n              salePrice\n            }\n          }\n        }\n        variation {\n          node {\n            id\n            databaseId\n            name\n            description\n            type\n            onSale\n            price\n            regularPrice\n            salePrice\n            image {\n              id\n              sourceUrl\n              srcSet\n              altText\n              title\n            }\n          }\n          attributes {\n            id\n            name\n            value\n          }\n        }\n        quantity\n        total\n        subtotal\n        subtotalTax\n      }\n    }\n    appliedCoupons {\n      code\n      discountAmount\n    }\n    subtotal\n    subtotalTax\n    shippingTax\n    shippingTotal\n    total\n    totalTax\n    feeTax\n    feeTotal\n    discountTax\n    discountTotal\n  }\n": types.CartFragmentFragmentDoc,
    "\n  fragment MediaItem on MediaItem {\n    id\n    srcSet\n    alt: altText\n    src: mediaItemUrl\n    mediaDetails {\n      width\n      height\n    }\n  }\n": types.MediaItemFragmentDoc,
    "\n  fragment FeaturedImage on NodeWithFeaturedImageToMediaItemConnectionEdge {\n    node {\n      ...MediaItem\n    }\n  }\n": types.FeaturedImageFragmentDoc,
    "fragment PageBase on Page {\n  id\n  databaseId\n  title\n}\n": types.PageBaseFragmentDoc,
    "fragment RelatedPage on Page {\n  ...PageBase\n  excerpt\n  uri\n}\n": types.RelatedPageFragmentDoc,
    "fragment RelatedPageNode on PageToPageConnectionEdge {\n  node {\n    ...RelatedPage\n  }\n}\n": types.RelatedPageNodeFragmentDoc,
    "fragment RelatedPages on PageToPageConnection {\n  edges {\n    ...RelatedPageNode\n  }\n}\n": types.RelatedPagesFragmentDoc,
    "fragment PageRelatedProduct on Page_Relatedproductsgroup_relatedProductsProducts_Product {\n  ...RelatedProduct\n}\n": types.PageRelatedProductFragmentDoc,
    "fragment PageRelatedProductNode on Page_Relatedproductsgroup_relatedProductsProducts {\n  ... on Page_Relatedproductsgroup_relatedProductsProducts {\n    product {\n      ...PageRelatedProduct\n    }\n  }\n}\n": types.PageRelatedProductNodeFragmentDoc,
    "fragment PageRelatedProducts on Page_Relatedproductsgroup {\n  title: relatedProductsTitle\n  products: relatedProductsProducts {\n    ...PageRelatedProductNode\n  }\n}\n": types.PageRelatedProductsFragmentDoc,
    "fragment PageDetails on Page {\n  ...PageBase\n  content\n  featuredImage {\n    ...FeaturedImage\n  }\n  videoGroup {\n    youtubeId\n  }\n  relatedPages {\n    ...RelatedPages\n  }\n  relatedPostersGroup {\n    title: relatedPostersTitle\n  }\n  relatedPosters(first: 7) {\n    ...RelatedPosters\n  }\n  relatedProducts: relatedProductsGroup {\n    ...PageRelatedProducts\n  }\n  seo {\n    ...seo\n  }\n}\n": types.PageDetailsFragmentDoc,
    "\nfragment PostBase on Post {\n  id\n  databaseId\n  date\n  title\n}\n": types.PostBaseFragmentDoc,
    "\nfragment PostListItem on Post {\n  ...PostBase\n  excerpt\n  slug\n}\n": types.PostListItemFragmentDoc,
    "\n  fragment PostListItemNode on RootQueryToPostConnectionEdge {\n  node {\n    ...PostListItem\n  }\n}\n": types.PostListItemNodeFragmentDoc,
    "\n  fragment PostListItems on RootQueryToPostConnection {\n    edges {\n      ...PostListItemNode\n    }\n  }\n": types.PostListItemsFragmentDoc,
    "\n  fragment PostRelatedProduct on Post_Relatedproductsgroup_relatedProductsProducts_Product {\n  ...RelatedProduct\n}\n": types.PostRelatedProductFragmentDoc,
    "\n  fragment PostRelatedProductNode on Post_Relatedproductsgroup_relatedProductsProducts {\n  ... on Post_Relatedproductsgroup_relatedProductsProducts {\n    product {\n      ...PostRelatedProduct\n    }\n  }\n}\n": types.PostRelatedProductNodeFragmentDoc,
    "\n  fragment PostRelatedProducts on Post_Relatedproductsgroup {\n  title: relatedProductsTitle\n  products: relatedProductsProducts {\n    ...PostRelatedProductNode\n  }\n}\n": types.PostRelatedProductsFragmentDoc,
    "\nfragment PostDetails on Post {\n  ...PostBase\n  content\n  videoGroup {\n    youtubeId\n  }\n  featuredImage {\n    ...FeaturedImage\n  }\n  relatedPostersGroup {\n    title: relatedPostersTitle\n  }\n  relatedPosters(first: 7) {\n    ...RelatedPosters\n  }\n  relatedProducts: relatedProductsGroup {\n    ...PostRelatedProducts\n  }\n  seo {\n    ...seo\n  }\n}\n": types.PostDetailsFragmentDoc,
    "fragment PosterBase on Poster {\n  id\n  databaseId\n  title\n}\n": types.PosterBaseFragmentDoc,
    "fragment Poster on Poster {\n  ...PosterBase\n  uri\n  slug\n  featuredImage {\n    ...FeaturedImage\n  }\n}": types.PosterFragmentDoc,
    "fragment RelatedPosterNode on ContentNodeToPosterConnectionEdge {\n  node {\n    ...Poster\n  }\n}\n": types.RelatedPosterNodeFragmentDoc,
    "fragment RelatedPosters on ContentNodeToPosterConnection {\n  edges {\n    ...RelatedPosterNode\n  }\n}": types.RelatedPostersFragmentDoc,
    "fragment PosterRelatedProduct on Poster_Relatedproductsgroup_relatedProductsProducts_Product {\n  ...Product\n}": types.PosterRelatedProductFragmentDoc,
    "fragment PosterRelatedProductNode on Poster_Relatedproductsgroup_relatedProductsProducts {\n    ... on Poster_Relatedproductsgroup_relatedProductsProducts {\n    product {\n      ...PosterRelatedProduct\n    }\n  }\n}": types.PosterRelatedProductNodeFragmentDoc,
    "fragment PosterRelatedProducts on Poster_Relatedproductsgroup {\n  title: relatedProductsTitle\n  products: relatedProductsProducts {\n    ...PosterRelatedProductNode\n  }\n}": types.PosterRelatedProductsFragmentDoc,
    "fragment PosterDetails on Poster {\n  ...PosterBase\n  slug\n  date\n  uri\n  link\n  featuredImage {\n    ...FeaturedImage\n  }\n  PosterMetaGroup {\n    date\n    pdf {\n      mediaItemUrl\n    }\n  }\n  sources {\n    ...Sources\n  }\n  subjects {\n    ...Subjects\n  }\n  seo {\n    ...seo\n  }\n  relatedProducts: relatedProductsGroup {\n    ...PosterRelatedProducts\n  }\n}": types.PosterDetailsFragmentDoc,
    "fragment PosterNode on RootQueryToPosterConnectionEdge {\n  node {\n    ...Poster\n  }\n}": types.PosterNodeFragmentDoc,
    "fragment Posters on RootQueryToPosterConnection {\n  edges {\n    ...PosterNode\n  }\n}": types.PostersFragmentDoc,
    "\n  fragment productCategory on ProductCategory {\n    id\n    databaseId\n    title: name\n    content: description\n    seo {\n      ...taxonomySeo\n    }\n    products(\n      first: 99\n      where: {\n        stockStatus: [IN_STOCK]\n        orderby: { field: MENU_ORDER, order: ASC }\n      }\n    ) {\n      edges {\n        node {\n          id\n          slug\n          databaseId\n          title: name\n          ...Product\n        }\n      }\n    }\n  }\n": types.ProductCategoryFragmentDoc,
    "\n  fragment categoryFields on ProductCategory {\n    id\n    name\n    uri\n    menuOrder\n  }\n": types.CategoryFieldsFragmentDoc,
    "fragment RelatedProduct on Product {\n  databaseId\n}\n": types.RelatedProductFragmentDoc,
    "fragment Product on Product {\n  slug\n  id\n  databaseId\n  title: name\n  featuredImage {\n    ...FeaturedImage\n  }\n  ... on SimpleProduct {\n    regularPrice\n    price\n    salePrice\n  }\n  ... on VariableProduct {\n    regularPrice\n    price\n    salePrice\n  }\n}\n": types.ProductFragmentDoc,
    "fragment GalleryImages on ProductToMediaItemConnection {\n  edges {\n    node {\n      ...MediaItem\n    }\n  }\n}\n": types.GalleryImagesFragmentDoc,
    "fragment ProductDetails on Product {\n  ...Product\n  featuredImage {\n    ...FeaturedImage\n  }\n  shortDescription\n  description\n  globalAttributes {\n    nodes {\n      id\n      name\n      slug\n      variation\n      position\n      scope\n      attributeId\n      visible\n      terms {\n        nodes {\n          id\n          databaseId\n          name\n          slug\n          count\n        }\n      }\n    }\n  }\n  galleryImages {\n    ...GalleryImages\n  }\n}\n": types.ProductDetailsFragmentDoc,
    "\n  fragment seo on PostTypeSEO {\n    metaDesc\n    opengraphUrl\n    title\n    schema {\n      raw\n    }\n  }\n": types.SeoFragmentDoc,
    "\n  fragment taxonomySeo on TaxonomySEO {\n    metaDesc\n    opengraphUrl\n    title\n    schema {\n      raw\n    }\n  }\n": types.TaxonomySeoFragmentDoc,
    "fragment Source on Source {\n  id\n  databaseId\n  title: name\n  taxonomy {\n    node {\n      name\n    }\n  }\n}\n": types.SourceFragmentDoc,
    "fragment Subject on Subject {\n  id\n  databaseId\n  title: name\n  taxonomy {\n    node {\n      name\n    }\n  }\n}\n": types.SubjectFragmentDoc,
    "fragment SourceNode on PosterToSourceConnectionEdge {\n  node {\n    ...Source\n  }\n}\n": types.SourceNodeFragmentDoc,
    "fragment Sources on PosterToSourceConnection {\n  edges {\n    ...SourceNode\n  }\n}\n": types.SourcesFragmentDoc,
    "fragment SubjectNode on PosterToSubjectConnectionEdge {\n  node {\n    ...Subject\n  }\n}\n": types.SubjectNodeFragmentDoc,
    "fragment Subjects on PosterToSubjectConnection {\n  edges {\n    ...SubjectNode\n  }\n}\n": types.SubjectsFragmentDoc,
    "\n  query GetPageByUri($uri: ID!) {\n    page(id: $uri, idType: URI) {\n      ...PageDetails\n    }\n  }\n": types.GetPageByUriDocument,
    "\n  query GetPageByID($id: ID!) {\n    page(id: $id, idType: DATABASE_ID) {\n      ...PageDetails\n    }\n  }\n": types.GetPageByIdDocument,
    "\n  query GetPageHome($id: ID!) {\n    page(id: $id, idType: DATABASE_ID) {\n      ...PageDetails\n    }\n    posts(first: 3, where: { hasPassword: false }) {\n      ...PostListItems\n    }\n  }\n": types.GetPageHomeDocument,
    "\n  query GetPageShop($id: ID!) {\n    page(id: $id, idType: DATABASE_ID) {\n      ...PageDetails\n    }\n  }\n": types.GetPageShopDocument,
    "\n  query GetPoster($slug: ID!) {\n    poster(id: $slug, idType: SLUG) {\n      ...PosterDetails\n      # relatedProducts: relatedProductsGroup {\n      #   ...posterRelatedProducts\n      # }\n\n\n      seo {\n        ...seo\n      }\n    }\n  }\n": types.GetPosterDocument,
    "\n  query SearchPoster($search: String) {\n    posters(where: { search: $search }, first: 10) {\n      edges {\n        node {\n          ...PosterBase\n          slug\n        }\n      }\n    }\n  }\n": types.SearchPosterDocument,
    "\n  query GetPosters(\n    $after: String\n    $where: RootQueryToPosterConnectionWhereArgs\n  ) {\n    posters(first: 20, after: $after, where: $where) {\n      pageInfo {\n        hasNextPage\n        endCursor\n        hasPreviousPage\n        startCursor\n      }\n      ...Posters\n    }\n  }\n": types.GetPostersDocument,
    "\n  query GetPost($slug: ID!) {\n    post(id: $slug, idType: URI) {\n      ...PostDetails\n    }\n  }\n": types.GetPostDocument,
    "\n  query GetPosts($after: String, $notIn: ID) {\n    posts(\n      first: 10\n      after: $after\n      where: { notIn: [$notIn], hasPassword: false }\n    ) {\n      pageInfo {\n        hasNextPage\n        endCursor\n        hasPreviousPage\n        startCursor\n      }\n      ...PostListItems\n    }\n  }\n": types.GetPostsDocument,
    "\n  query GetProductCategory($slug: ID!) {\n    productCategory(id: $slug, idType: SLUG) {\n      ...productCategory\n    }\n  }\n": types.GetProductCategoryDocument,
    "\n  query GetProductCategories {\n    productCategories(\n      where: { hideEmpty: true, orderby: TERM_ORDER, order: ASC }\n      first: 99\n    ) {\n      edges {\n        node {\n          ...categoryFields\n          parentDatabaseId\n          children {\n            edges {\n              node {\n                ...categoryFields\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetProductCategoriesDocument,
    "\n  query GetProduct($slug: ID!) {\n    product(id: $slug, idType: SLUG) {\n      ...ProductDetails\n      seo {\n        ...seo\n      }\n\n      # galleryImages {\n      #   edges {\n      #     node {\n      #       ...mediaItem\n      #     }\n      #   }\n      # }\n\n      related(first: 12, where: { stockStatus: [IN_STOCK] }) {\n        edges {\n          node {\n            databaseId\n          }\n        }\n      }\n    }\n  }\n": types.GetProductDocument,
    "\n  query GetProducts($categoryId: Int, $featured: Boolean, $include: [Int]) {\n    products(\n      where: {\n        featured: $featured\n        include: $include\n        categoryId: $categoryId\n        stockStatus: [IN_STOCK]\n        orderby: { field: MENU_ORDER, order: ASC }\n      }\n      first: 99\n    ) {\n      edges {\n        node {\n          ...Product\n        }\n      }\n    }\n  }\n": types.GetProductsDocument,
    "\n  query GetTaxonomies {\n    sources(first: 100) {\n      edges {\n        node {\n          ...Source\n        }\n      }\n    }\n    subjects(first: 100) {\n      edges {\n        node {\n          ...Subject\n        }\n      }\n    }\n  }\n": types.GetTaxonomiesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCart {\n    cart {\n      ...cartFragment\n    }\n  }\n"): (typeof documents)["\n  query GetCart {\n    cart {\n      ...cartFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddToCart($productId: Int!, $quantity: Int) {\n    addToCart(input: { productId: $productId, quantity: $quantity }) {\n      cart {\n        ...cartFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddToCart($productId: Int!, $quantity: Int) {\n    addToCart(input: { productId: $productId, quantity: $quantity }) {\n      cart {\n        ...cartFragment\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SubmitWorkshop(\n    $address: String\n    $city: String\n    $clientMutationId: String\n    $companyName: String\n    $date: String\n    $email: String\n    $location: String\n    $motivation: String\n    $name: String\n    $phoneNumber: String\n    $theme: String\n    $time: String\n    $totalAttendees: Int\n    $totalWorkshops: Int\n    $zipcode: String\n  ) {\n    requestWorkshop(\n      input: {\n        address: $address\n        city: $city\n        clientMutationId: $clientMutationId\n        companyName: $companyName\n        date: $date\n        email: $email\n        location: $location\n        motivation: $motivation\n        name: $name\n        phoneNumber: $phoneNumber\n        theme: $theme\n        time: $time\n        totalAttendees: $totalAttendees\n        totalWorkshops: $totalWorkshops\n        zipcode: $zipcode\n      }\n    ) {\n      response\n    }\n  }\n"): (typeof documents)["\n  mutation SubmitWorkshop(\n    $address: String\n    $city: String\n    $clientMutationId: String\n    $companyName: String\n    $date: String\n    $email: String\n    $location: String\n    $motivation: String\n    $name: String\n    $phoneNumber: String\n    $theme: String\n    $time: String\n    $totalAttendees: Int\n    $totalWorkshops: Int\n    $zipcode: String\n  ) {\n    requestWorkshop(\n      input: {\n        address: $address\n        city: $city\n        clientMutationId: $clientMutationId\n        companyName: $companyName\n        date: $date\n        email: $email\n        location: $location\n        motivation: $motivation\n        name: $name\n        phoneNumber: $phoneNumber\n        theme: $theme\n        time: $time\n        totalAttendees: $totalAttendees\n        totalWorkshops: $totalWorkshops\n        zipcode: $zipcode\n      }\n    ) {\n      response\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment cartFragment on Cart {\n    contents {\n      nodes {\n        key\n        product {\n          node {\n            id\n            databaseId\n            name\n            image {\n              id\n              altText\n              thumbnail: sourceUrl(size: THUMBNAIL)\n              medium: sourceUrl(size: MEDIUM)\n              mediumLarge: sourceUrl(size: MEDIUM_LARGE)\n            }\n            ... on SimpleProduct {\n              id\n              regularPrice\n              price\n              salePrice\n            }\n            ... on VariableProduct {\n              id\n              regularPrice\n              price\n              salePrice\n            }\n          }\n        }\n        variation {\n          node {\n            id\n            databaseId\n            name\n            description\n            type\n            onSale\n            price\n            regularPrice\n            salePrice\n            image {\n              id\n              sourceUrl\n              srcSet\n              altText\n              title\n            }\n          }\n          attributes {\n            id\n            name\n            value\n          }\n        }\n        quantity\n        total\n        subtotal\n        subtotalTax\n      }\n    }\n    appliedCoupons {\n      code\n      discountAmount\n    }\n    subtotal\n    subtotalTax\n    shippingTax\n    shippingTotal\n    total\n    totalTax\n    feeTax\n    feeTotal\n    discountTax\n    discountTotal\n  }\n"): (typeof documents)["\n  fragment cartFragment on Cart {\n    contents {\n      nodes {\n        key\n        product {\n          node {\n            id\n            databaseId\n            name\n            image {\n              id\n              altText\n              thumbnail: sourceUrl(size: THUMBNAIL)\n              medium: sourceUrl(size: MEDIUM)\n              mediumLarge: sourceUrl(size: MEDIUM_LARGE)\n            }\n            ... on SimpleProduct {\n              id\n              regularPrice\n              price\n              salePrice\n            }\n            ... on VariableProduct {\n              id\n              regularPrice\n              price\n              salePrice\n            }\n          }\n        }\n        variation {\n          node {\n            id\n            databaseId\n            name\n            description\n            type\n            onSale\n            price\n            regularPrice\n            salePrice\n            image {\n              id\n              sourceUrl\n              srcSet\n              altText\n              title\n            }\n          }\n          attributes {\n            id\n            name\n            value\n          }\n        }\n        quantity\n        total\n        subtotal\n        subtotalTax\n      }\n    }\n    appliedCoupons {\n      code\n      discountAmount\n    }\n    subtotal\n    subtotalTax\n    shippingTax\n    shippingTotal\n    total\n    totalTax\n    feeTax\n    feeTotal\n    discountTax\n    discountTotal\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MediaItem on MediaItem {\n    id\n    srcSet\n    alt: altText\n    src: mediaItemUrl\n    mediaDetails {\n      width\n      height\n    }\n  }\n"): (typeof documents)["\n  fragment MediaItem on MediaItem {\n    id\n    srcSet\n    alt: altText\n    src: mediaItemUrl\n    mediaDetails {\n      width\n      height\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment FeaturedImage on NodeWithFeaturedImageToMediaItemConnectionEdge {\n    node {\n      ...MediaItem\n    }\n  }\n"): (typeof documents)["\n  fragment FeaturedImage on NodeWithFeaturedImageToMediaItemConnectionEdge {\n    node {\n      ...MediaItem\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PageBase on Page {\n  id\n  databaseId\n  title\n}\n"): (typeof documents)["fragment PageBase on Page {\n  id\n  databaseId\n  title\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RelatedPage on Page {\n  ...PageBase\n  excerpt\n  uri\n}\n"): (typeof documents)["fragment RelatedPage on Page {\n  ...PageBase\n  excerpt\n  uri\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RelatedPageNode on PageToPageConnectionEdge {\n  node {\n    ...RelatedPage\n  }\n}\n"): (typeof documents)["fragment RelatedPageNode on PageToPageConnectionEdge {\n  node {\n    ...RelatedPage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RelatedPages on PageToPageConnection {\n  edges {\n    ...RelatedPageNode\n  }\n}\n"): (typeof documents)["fragment RelatedPages on PageToPageConnection {\n  edges {\n    ...RelatedPageNode\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PageRelatedProduct on Page_Relatedproductsgroup_relatedProductsProducts_Product {\n  ...RelatedProduct\n}\n"): (typeof documents)["fragment PageRelatedProduct on Page_Relatedproductsgroup_relatedProductsProducts_Product {\n  ...RelatedProduct\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PageRelatedProductNode on Page_Relatedproductsgroup_relatedProductsProducts {\n  ... on Page_Relatedproductsgroup_relatedProductsProducts {\n    product {\n      ...PageRelatedProduct\n    }\n  }\n}\n"): (typeof documents)["fragment PageRelatedProductNode on Page_Relatedproductsgroup_relatedProductsProducts {\n  ... on Page_Relatedproductsgroup_relatedProductsProducts {\n    product {\n      ...PageRelatedProduct\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PageRelatedProducts on Page_Relatedproductsgroup {\n  title: relatedProductsTitle\n  products: relatedProductsProducts {\n    ...PageRelatedProductNode\n  }\n}\n"): (typeof documents)["fragment PageRelatedProducts on Page_Relatedproductsgroup {\n  title: relatedProductsTitle\n  products: relatedProductsProducts {\n    ...PageRelatedProductNode\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PageDetails on Page {\n  ...PageBase\n  content\n  featuredImage {\n    ...FeaturedImage\n  }\n  videoGroup {\n    youtubeId\n  }\n  relatedPages {\n    ...RelatedPages\n  }\n  relatedPostersGroup {\n    title: relatedPostersTitle\n  }\n  relatedPosters(first: 7) {\n    ...RelatedPosters\n  }\n  relatedProducts: relatedProductsGroup {\n    ...PageRelatedProducts\n  }\n  seo {\n    ...seo\n  }\n}\n"): (typeof documents)["fragment PageDetails on Page {\n  ...PageBase\n  content\n  featuredImage {\n    ...FeaturedImage\n  }\n  videoGroup {\n    youtubeId\n  }\n  relatedPages {\n    ...RelatedPages\n  }\n  relatedPostersGroup {\n    title: relatedPostersTitle\n  }\n  relatedPosters(first: 7) {\n    ...RelatedPosters\n  }\n  relatedProducts: relatedProductsGroup {\n    ...PageRelatedProducts\n  }\n  seo {\n    ...seo\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nfragment PostBase on Post {\n  id\n  databaseId\n  date\n  title\n}\n"): (typeof documents)["\nfragment PostBase on Post {\n  id\n  databaseId\n  date\n  title\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nfragment PostListItem on Post {\n  ...PostBase\n  excerpt\n  slug\n}\n"): (typeof documents)["\nfragment PostListItem on Post {\n  ...PostBase\n  excerpt\n  slug\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PostListItemNode on RootQueryToPostConnectionEdge {\n  node {\n    ...PostListItem\n  }\n}\n"): (typeof documents)["\n  fragment PostListItemNode on RootQueryToPostConnectionEdge {\n  node {\n    ...PostListItem\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PostListItems on RootQueryToPostConnection {\n    edges {\n      ...PostListItemNode\n    }\n  }\n"): (typeof documents)["\n  fragment PostListItems on RootQueryToPostConnection {\n    edges {\n      ...PostListItemNode\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PostRelatedProduct on Post_Relatedproductsgroup_relatedProductsProducts_Product {\n  ...RelatedProduct\n}\n"): (typeof documents)["\n  fragment PostRelatedProduct on Post_Relatedproductsgroup_relatedProductsProducts_Product {\n  ...RelatedProduct\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PostRelatedProductNode on Post_Relatedproductsgroup_relatedProductsProducts {\n  ... on Post_Relatedproductsgroup_relatedProductsProducts {\n    product {\n      ...PostRelatedProduct\n    }\n  }\n}\n"): (typeof documents)["\n  fragment PostRelatedProductNode on Post_Relatedproductsgroup_relatedProductsProducts {\n  ... on Post_Relatedproductsgroup_relatedProductsProducts {\n    product {\n      ...PostRelatedProduct\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PostRelatedProducts on Post_Relatedproductsgroup {\n  title: relatedProductsTitle\n  products: relatedProductsProducts {\n    ...PostRelatedProductNode\n  }\n}\n"): (typeof documents)["\n  fragment PostRelatedProducts on Post_Relatedproductsgroup {\n  title: relatedProductsTitle\n  products: relatedProductsProducts {\n    ...PostRelatedProductNode\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nfragment PostDetails on Post {\n  ...PostBase\n  content\n  videoGroup {\n    youtubeId\n  }\n  featuredImage {\n    ...FeaturedImage\n  }\n  relatedPostersGroup {\n    title: relatedPostersTitle\n  }\n  relatedPosters(first: 7) {\n    ...RelatedPosters\n  }\n  relatedProducts: relatedProductsGroup {\n    ...PostRelatedProducts\n  }\n  seo {\n    ...seo\n  }\n}\n"): (typeof documents)["\nfragment PostDetails on Post {\n  ...PostBase\n  content\n  videoGroup {\n    youtubeId\n  }\n  featuredImage {\n    ...FeaturedImage\n  }\n  relatedPostersGroup {\n    title: relatedPostersTitle\n  }\n  relatedPosters(first: 7) {\n    ...RelatedPosters\n  }\n  relatedProducts: relatedProductsGroup {\n    ...PostRelatedProducts\n  }\n  seo {\n    ...seo\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PosterBase on Poster {\n  id\n  databaseId\n  title\n}\n"): (typeof documents)["fragment PosterBase on Poster {\n  id\n  databaseId\n  title\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Poster on Poster {\n  ...PosterBase\n  uri\n  slug\n  featuredImage {\n    ...FeaturedImage\n  }\n}"): (typeof documents)["fragment Poster on Poster {\n  ...PosterBase\n  uri\n  slug\n  featuredImage {\n    ...FeaturedImage\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RelatedPosterNode on ContentNodeToPosterConnectionEdge {\n  node {\n    ...Poster\n  }\n}\n"): (typeof documents)["fragment RelatedPosterNode on ContentNodeToPosterConnectionEdge {\n  node {\n    ...Poster\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RelatedPosters on ContentNodeToPosterConnection {\n  edges {\n    ...RelatedPosterNode\n  }\n}"): (typeof documents)["fragment RelatedPosters on ContentNodeToPosterConnection {\n  edges {\n    ...RelatedPosterNode\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PosterRelatedProduct on Poster_Relatedproductsgroup_relatedProductsProducts_Product {\n  ...Product\n}"): (typeof documents)["fragment PosterRelatedProduct on Poster_Relatedproductsgroup_relatedProductsProducts_Product {\n  ...Product\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PosterRelatedProductNode on Poster_Relatedproductsgroup_relatedProductsProducts {\n    ... on Poster_Relatedproductsgroup_relatedProductsProducts {\n    product {\n      ...PosterRelatedProduct\n    }\n  }\n}"): (typeof documents)["fragment PosterRelatedProductNode on Poster_Relatedproductsgroup_relatedProductsProducts {\n    ... on Poster_Relatedproductsgroup_relatedProductsProducts {\n    product {\n      ...PosterRelatedProduct\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PosterRelatedProducts on Poster_Relatedproductsgroup {\n  title: relatedProductsTitle\n  products: relatedProductsProducts {\n    ...PosterRelatedProductNode\n  }\n}"): (typeof documents)["fragment PosterRelatedProducts on Poster_Relatedproductsgroup {\n  title: relatedProductsTitle\n  products: relatedProductsProducts {\n    ...PosterRelatedProductNode\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PosterDetails on Poster {\n  ...PosterBase\n  slug\n  date\n  uri\n  link\n  featuredImage {\n    ...FeaturedImage\n  }\n  PosterMetaGroup {\n    date\n    pdf {\n      mediaItemUrl\n    }\n  }\n  sources {\n    ...Sources\n  }\n  subjects {\n    ...Subjects\n  }\n  seo {\n    ...seo\n  }\n  relatedProducts: relatedProductsGroup {\n    ...PosterRelatedProducts\n  }\n}"): (typeof documents)["fragment PosterDetails on Poster {\n  ...PosterBase\n  slug\n  date\n  uri\n  link\n  featuredImage {\n    ...FeaturedImage\n  }\n  PosterMetaGroup {\n    date\n    pdf {\n      mediaItemUrl\n    }\n  }\n  sources {\n    ...Sources\n  }\n  subjects {\n    ...Subjects\n  }\n  seo {\n    ...seo\n  }\n  relatedProducts: relatedProductsGroup {\n    ...PosterRelatedProducts\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PosterNode on RootQueryToPosterConnectionEdge {\n  node {\n    ...Poster\n  }\n}"): (typeof documents)["fragment PosterNode on RootQueryToPosterConnectionEdge {\n  node {\n    ...Poster\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Posters on RootQueryToPosterConnection {\n  edges {\n    ...PosterNode\n  }\n}"): (typeof documents)["fragment Posters on RootQueryToPosterConnection {\n  edges {\n    ...PosterNode\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment productCategory on ProductCategory {\n    id\n    databaseId\n    title: name\n    content: description\n    seo {\n      ...taxonomySeo\n    }\n    products(\n      first: 99\n      where: {\n        stockStatus: [IN_STOCK]\n        orderby: { field: MENU_ORDER, order: ASC }\n      }\n    ) {\n      edges {\n        node {\n          id\n          slug\n          databaseId\n          title: name\n          ...Product\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment productCategory on ProductCategory {\n    id\n    databaseId\n    title: name\n    content: description\n    seo {\n      ...taxonomySeo\n    }\n    products(\n      first: 99\n      where: {\n        stockStatus: [IN_STOCK]\n        orderby: { field: MENU_ORDER, order: ASC }\n      }\n    ) {\n      edges {\n        node {\n          id\n          slug\n          databaseId\n          title: name\n          ...Product\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment categoryFields on ProductCategory {\n    id\n    name\n    uri\n    menuOrder\n  }\n"): (typeof documents)["\n  fragment categoryFields on ProductCategory {\n    id\n    name\n    uri\n    menuOrder\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RelatedProduct on Product {\n  databaseId\n}\n"): (typeof documents)["fragment RelatedProduct on Product {\n  databaseId\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Product on Product {\n  slug\n  id\n  databaseId\n  title: name\n  featuredImage {\n    ...FeaturedImage\n  }\n  ... on SimpleProduct {\n    regularPrice\n    price\n    salePrice\n  }\n  ... on VariableProduct {\n    regularPrice\n    price\n    salePrice\n  }\n}\n"): (typeof documents)["fragment Product on Product {\n  slug\n  id\n  databaseId\n  title: name\n  featuredImage {\n    ...FeaturedImage\n  }\n  ... on SimpleProduct {\n    regularPrice\n    price\n    salePrice\n  }\n  ... on VariableProduct {\n    regularPrice\n    price\n    salePrice\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment GalleryImages on ProductToMediaItemConnection {\n  edges {\n    node {\n      ...MediaItem\n    }\n  }\n}\n"): (typeof documents)["fragment GalleryImages on ProductToMediaItemConnection {\n  edges {\n    node {\n      ...MediaItem\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductDetails on Product {\n  ...Product\n  featuredImage {\n    ...FeaturedImage\n  }\n  shortDescription\n  description\n  globalAttributes {\n    nodes {\n      id\n      name\n      slug\n      variation\n      position\n      scope\n      attributeId\n      visible\n      terms {\n        nodes {\n          id\n          databaseId\n          name\n          slug\n          count\n        }\n      }\n    }\n  }\n  galleryImages {\n    ...GalleryImages\n  }\n}\n"): (typeof documents)["fragment ProductDetails on Product {\n  ...Product\n  featuredImage {\n    ...FeaturedImage\n  }\n  shortDescription\n  description\n  globalAttributes {\n    nodes {\n      id\n      name\n      slug\n      variation\n      position\n      scope\n      attributeId\n      visible\n      terms {\n        nodes {\n          id\n          databaseId\n          name\n          slug\n          count\n        }\n      }\n    }\n  }\n  galleryImages {\n    ...GalleryImages\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment seo on PostTypeSEO {\n    metaDesc\n    opengraphUrl\n    title\n    schema {\n      raw\n    }\n  }\n"): (typeof documents)["\n  fragment seo on PostTypeSEO {\n    metaDesc\n    opengraphUrl\n    title\n    schema {\n      raw\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment taxonomySeo on TaxonomySEO {\n    metaDesc\n    opengraphUrl\n    title\n    schema {\n      raw\n    }\n  }\n"): (typeof documents)["\n  fragment taxonomySeo on TaxonomySEO {\n    metaDesc\n    opengraphUrl\n    title\n    schema {\n      raw\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Source on Source {\n  id\n  databaseId\n  title: name\n  taxonomy {\n    node {\n      name\n    }\n  }\n}\n"): (typeof documents)["fragment Source on Source {\n  id\n  databaseId\n  title: name\n  taxonomy {\n    node {\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Subject on Subject {\n  id\n  databaseId\n  title: name\n  taxonomy {\n    node {\n      name\n    }\n  }\n}\n"): (typeof documents)["fragment Subject on Subject {\n  id\n  databaseId\n  title: name\n  taxonomy {\n    node {\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment SourceNode on PosterToSourceConnectionEdge {\n  node {\n    ...Source\n  }\n}\n"): (typeof documents)["fragment SourceNode on PosterToSourceConnectionEdge {\n  node {\n    ...Source\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Sources on PosterToSourceConnection {\n  edges {\n    ...SourceNode\n  }\n}\n"): (typeof documents)["fragment Sources on PosterToSourceConnection {\n  edges {\n    ...SourceNode\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment SubjectNode on PosterToSubjectConnectionEdge {\n  node {\n    ...Subject\n  }\n}\n"): (typeof documents)["fragment SubjectNode on PosterToSubjectConnectionEdge {\n  node {\n    ...Subject\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Subjects on PosterToSubjectConnection {\n  edges {\n    ...SubjectNode\n  }\n}\n"): (typeof documents)["fragment Subjects on PosterToSubjectConnection {\n  edges {\n    ...SubjectNode\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPageByUri($uri: ID!) {\n    page(id: $uri, idType: URI) {\n      ...PageDetails\n    }\n  }\n"): (typeof documents)["\n  query GetPageByUri($uri: ID!) {\n    page(id: $uri, idType: URI) {\n      ...PageDetails\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPageByID($id: ID!) {\n    page(id: $id, idType: DATABASE_ID) {\n      ...PageDetails\n    }\n  }\n"): (typeof documents)["\n  query GetPageByID($id: ID!) {\n    page(id: $id, idType: DATABASE_ID) {\n      ...PageDetails\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPageHome($id: ID!) {\n    page(id: $id, idType: DATABASE_ID) {\n      ...PageDetails\n    }\n    posts(first: 3, where: { hasPassword: false }) {\n      ...PostListItems\n    }\n  }\n"): (typeof documents)["\n  query GetPageHome($id: ID!) {\n    page(id: $id, idType: DATABASE_ID) {\n      ...PageDetails\n    }\n    posts(first: 3, where: { hasPassword: false }) {\n      ...PostListItems\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPageShop($id: ID!) {\n    page(id: $id, idType: DATABASE_ID) {\n      ...PageDetails\n    }\n  }\n"): (typeof documents)["\n  query GetPageShop($id: ID!) {\n    page(id: $id, idType: DATABASE_ID) {\n      ...PageDetails\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPoster($slug: ID!) {\n    poster(id: $slug, idType: SLUG) {\n      ...PosterDetails\n      # relatedProducts: relatedProductsGroup {\n      #   ...posterRelatedProducts\n      # }\n\n\n      seo {\n        ...seo\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPoster($slug: ID!) {\n    poster(id: $slug, idType: SLUG) {\n      ...PosterDetails\n      # relatedProducts: relatedProductsGroup {\n      #   ...posterRelatedProducts\n      # }\n\n\n      seo {\n        ...seo\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchPoster($search: String) {\n    posters(where: { search: $search }, first: 10) {\n      edges {\n        node {\n          ...PosterBase\n          slug\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchPoster($search: String) {\n    posters(where: { search: $search }, first: 10) {\n      edges {\n        node {\n          ...PosterBase\n          slug\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPosters(\n    $after: String\n    $where: RootQueryToPosterConnectionWhereArgs\n  ) {\n    posters(first: 20, after: $after, where: $where) {\n      pageInfo {\n        hasNextPage\n        endCursor\n        hasPreviousPage\n        startCursor\n      }\n      ...Posters\n    }\n  }\n"): (typeof documents)["\n  query GetPosters(\n    $after: String\n    $where: RootQueryToPosterConnectionWhereArgs\n  ) {\n    posters(first: 20, after: $after, where: $where) {\n      pageInfo {\n        hasNextPage\n        endCursor\n        hasPreviousPage\n        startCursor\n      }\n      ...Posters\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPost($slug: ID!) {\n    post(id: $slug, idType: URI) {\n      ...PostDetails\n    }\n  }\n"): (typeof documents)["\n  query GetPost($slug: ID!) {\n    post(id: $slug, idType: URI) {\n      ...PostDetails\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPosts($after: String, $notIn: ID) {\n    posts(\n      first: 10\n      after: $after\n      where: { notIn: [$notIn], hasPassword: false }\n    ) {\n      pageInfo {\n        hasNextPage\n        endCursor\n        hasPreviousPage\n        startCursor\n      }\n      ...PostListItems\n    }\n  }\n"): (typeof documents)["\n  query GetPosts($after: String, $notIn: ID) {\n    posts(\n      first: 10\n      after: $after\n      where: { notIn: [$notIn], hasPassword: false }\n    ) {\n      pageInfo {\n        hasNextPage\n        endCursor\n        hasPreviousPage\n        startCursor\n      }\n      ...PostListItems\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProductCategory($slug: ID!) {\n    productCategory(id: $slug, idType: SLUG) {\n      ...productCategory\n    }\n  }\n"): (typeof documents)["\n  query GetProductCategory($slug: ID!) {\n    productCategory(id: $slug, idType: SLUG) {\n      ...productCategory\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProductCategories {\n    productCategories(\n      where: { hideEmpty: true, orderby: TERM_ORDER, order: ASC }\n      first: 99\n    ) {\n      edges {\n        node {\n          ...categoryFields\n          parentDatabaseId\n          children {\n            edges {\n              node {\n                ...categoryFields\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProductCategories {\n    productCategories(\n      where: { hideEmpty: true, orderby: TERM_ORDER, order: ASC }\n      first: 99\n    ) {\n      edges {\n        node {\n          ...categoryFields\n          parentDatabaseId\n          children {\n            edges {\n              node {\n                ...categoryFields\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProduct($slug: ID!) {\n    product(id: $slug, idType: SLUG) {\n      ...ProductDetails\n      seo {\n        ...seo\n      }\n\n      # galleryImages {\n      #   edges {\n      #     node {\n      #       ...mediaItem\n      #     }\n      #   }\n      # }\n\n      related(first: 12, where: { stockStatus: [IN_STOCK] }) {\n        edges {\n          node {\n            databaseId\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProduct($slug: ID!) {\n    product(id: $slug, idType: SLUG) {\n      ...ProductDetails\n      seo {\n        ...seo\n      }\n\n      # galleryImages {\n      #   edges {\n      #     node {\n      #       ...mediaItem\n      #     }\n      #   }\n      # }\n\n      related(first: 12, where: { stockStatus: [IN_STOCK] }) {\n        edges {\n          node {\n            databaseId\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProducts($categoryId: Int, $featured: Boolean, $include: [Int]) {\n    products(\n      where: {\n        featured: $featured\n        include: $include\n        categoryId: $categoryId\n        stockStatus: [IN_STOCK]\n        orderby: { field: MENU_ORDER, order: ASC }\n      }\n      first: 99\n    ) {\n      edges {\n        node {\n          ...Product\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProducts($categoryId: Int, $featured: Boolean, $include: [Int]) {\n    products(\n      where: {\n        featured: $featured\n        include: $include\n        categoryId: $categoryId\n        stockStatus: [IN_STOCK]\n        orderby: { field: MENU_ORDER, order: ASC }\n      }\n      first: 99\n    ) {\n      edges {\n        node {\n          ...Product\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTaxonomies {\n    sources(first: 100) {\n      edges {\n        node {\n          ...Source\n        }\n      }\n    }\n    subjects(first: 100) {\n      edges {\n        node {\n          ...Subject\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTaxonomies {\n    sources(first: 100) {\n      edges {\n        node {\n          ...Source\n        }\n      }\n    }\n    subjects(first: 100) {\n      edges {\n        node {\n          ...Subject\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;