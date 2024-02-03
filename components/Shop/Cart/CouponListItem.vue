<script lang="ts" setup>
import type { Coupon } from '~/types/Cart'

const props = defineProps<{
  coupon: Coupon
}>()

const nonce = useCookie('nonce')
const token = useCookie('token')

const cartState = useCartState()

const { data, execute, status } = useFetch('/api/coupons/remove', {
  method: 'DELETE',
  body: {
    code: props.coupon.code,
  },
  headers: {
    nonce: nonce.value ?? '',
    token: token.value ?? '',
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
    -{{ coupon.totals.total_discount }}
    <button @click="removeCoupon">remove</button>
  </li>
</template>
