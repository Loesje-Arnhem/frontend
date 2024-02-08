<script lang="ts" setup>
import type { Coupon } from '~/types/Cart'

const props = defineProps<{
  coupon: Coupon
}>()

const cartState = useCartState()

const { data, execute, status } = useFetch('/api/coupons/remove', {
  method: 'DELETE',
  body: {
    code: props.coupon.code,
  },

  immediate: false,
  transform: (response) => {
    cartState.value = response
  },
})

// const { mutate } = useRemoveCoupon()

const removeCoupon = async () => {
  await execute()
}
</script>

<template>
  <li>
    {{ coupon.code }}
    -{{ $n(coupon.price, 'currency') }}
    <button @click="removeCoupon">remove</button>
  </li>
</template>
