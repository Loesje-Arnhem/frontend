import { gql } from '~/types/__generated__'

export default gql(`
  query GetCart {
    cart {
      ...cartFragment
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
  }
`)
