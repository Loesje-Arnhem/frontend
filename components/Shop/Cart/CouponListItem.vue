<template>
  <li>
    {{ coupon.code }}
    <button @click="removeCoupon">remove</button>
  </li>
</template>

<script>
import { useRemoveCoupon } from '~/compositions/cart'

export default {
  props: {
    coupon: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { removeCoupon } = useRemoveCoupon(props.coupon.code)

    return {
      removeCoupon,
    }
  },
}
</script>
