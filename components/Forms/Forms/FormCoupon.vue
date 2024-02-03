<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'

const formData = reactive({
  code: 'jorrit10',
})

const nonce = useCookie('nonce')
const token = useCookie('token')

const cartState = useCartState()
const { data, execute, status } = useFetch('/api/coupons/add', {
  method: 'POST',
  body: {
    code: formData.code,
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
    @submit="submit"
  >
    {{ data }}
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
