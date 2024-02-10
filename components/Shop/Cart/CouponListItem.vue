<script lang="ts" setup>
import type { Coupon } from '~/types/Cart'

const props = defineProps<{
  coupon: Coupon
}>()

const pending = ref(false)
const errorMessage = ref<string | null>(null)
const cartState = useCartState()

const removeCoupon = async () => {
  pending.value = true
  errorMessage.value = null

  try {
    const response = await $fetch('/api/coupons/remove', {
      method: 'DELETE',
      body: {
        code: props.coupon.code,
      },
    })
    cartState.value = response
  } catch (error: any) {
    errorMessage.value = error.statusMessage
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <li>
    {{ coupon.code }}
    -{{ $n(coupon.price, 'currency') }}
    <button @click="removeCoupon">remove</button>
  </li>
</template>
