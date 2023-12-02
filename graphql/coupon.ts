import { gql } from '~/graphql/__generated__'

export const addCouponMutation = gql(`
  mutation AddCoupon($code: String!) {
    applyCoupon(
      input: { code: $code }
    ) {
      cart {
        ...cartFragment
      }
    }
  }
`)

export const removeCouponMutation = gql(`
  mutation RemoveCoupon($codes: [String]) {
    removeCoupons(
      input: { 
        codes: $codes 
      }
    ) {
      cart {
        ...cartFragment
      }
    }
  }
`)
