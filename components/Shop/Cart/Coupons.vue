<template>
  <form class="form" @submit.prevent="applyCoupon">
    <form-fieldset title="Coupon">
      <form-input-text
        id="code"
        v-model="code"
        title="Couponcode"
        name="code"
      />
    </form-fieldset>
    <app-button :disabled="loading" type="submit">
      Waardebon toepassen
    </app-button>
    <div v-if="errors.length" v-html="errors.join(', ')" />
  </form>
</template>

<script>
import { useApplyCoupon } from '~/composables/coupon'

export default {
  setup() {
    const { applyCoupon, loading, errors, code } = useApplyCoupon()

    return {
      errors,
      loading,
      code,
      applyCoupon,
    }
  },
}
</script>
