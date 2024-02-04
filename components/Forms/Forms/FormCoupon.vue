<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'

const formData = reactive({
  code: 'jorrit1zz0',
})

const cartState = useCartState()
const { execute, status, error } = useFetch('/api/coupons/add', {
  method: 'POST',
  body: formData,
  watch: false,
  immediate: false,
  transform: (response) => {
    cartState.value = response
  },
})

const { required, email } = useValidators()

const rules = {
  code: { required, email },
}

const v$ = useVuelidate(rules, formData)

const submit = async () => {
  await execute()
}
</script>

<template>
  <app-form
    :loading="status === 'pending'"
    button-title="Waardebon toepassen"
    :error="error?.statusMessage"
    @submit="submit"
  >
    <form-fieldset title="Coupon">
      <input-text-field
        id="coupon"
        v-model="formData.code"
        autocomplete="false"
        title="code"
        :errors="v$.code.$errors"
      />
    </form-fieldset>
  </app-form>
</template>
