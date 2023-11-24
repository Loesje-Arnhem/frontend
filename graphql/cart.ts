const cartFragment = gql`
  fragment cartFragment on Cart {
    contents {
      nodes {
        key
        product {
          node {
            id
            databaseId
            name
            image {
              id
              altText
              thumbnail: sourceUrl(size: THUMBNAIL)
              medium: sourceUrl(size: MEDIUM)
              mediumLarge: sourceUrl(size: MEDIUM_LARGE)
            }
            ... on SimpleProduct {
              id
              regularPrice
              price
              salePrice
            }
            ... on VariableProduct {
              id
              regularPrice
              price
              salePrice
            }
          }
        }
        variation {
          node {
            id
            databaseId
            name
            description
            type
            onSale
            price
            regularPrice
            salePrice
            image {
              id
              sourceUrl
              srcSet
              altText
              title
            }
          }
          attributes {
            id
            name
            value
          }
        }
        quantity
        total
        subtotal
        subtotalTax
      }
    }
    appliedCoupons {
      code
      discountAmount
    }
    subtotal
    subtotalTax
    shippingTax
    shippingTotal
    total
    totalTax
    feeTax
    feeTotal
    discountTax
    discountTotal
  }
`

export const getCartQuery = gql`
  query GetCart {
    cart {
      ...cartFragment
    }
  }
  ${cartFragment}
`

export const addToCartMutation = gql`
  mutation AddToCart($productId: Int!, $quantity: Int) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      cart {
        ...cartFragment
      }
    }
  }
  ${cartFragment}
`