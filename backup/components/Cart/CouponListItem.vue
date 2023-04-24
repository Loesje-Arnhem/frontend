<template>
  <li>
    {{ coupon.code }}
    -{{ coupon.discountAmount }}
    <button @click="removeCoupon">
      remove
    </button>
  </li>
</template>

<script>
import { useRemoveCoupon } from '~/composables/coupon'

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
