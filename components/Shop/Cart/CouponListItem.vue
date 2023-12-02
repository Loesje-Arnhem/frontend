<script lang="ts" setup>
import type { AppliedCoupon } from '~/graphql/__generated__/graphql'

const props = defineProps<{
  coupon: AppliedCoupon
}>()

const { mutate } = useRemoveCoupon()

const removeCoupon = () => {
  mutate({
    codes: [props.coupon.code],
  })
}
</script>

<template>
  <li>
    {{ coupon.code }}
    -{{ coupon.discountAmount }}
    <button @click="removeCoupon">remove</button>
  </li>
</template>
