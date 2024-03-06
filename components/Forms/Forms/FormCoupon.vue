<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'

const formData = reactive({
  code: '',
})

const pending = ref(false)
const errorMessage = ref<string | null>(null)
const cartState = useCartState()

const { required } = useValidators()

const rules = {
  code: { required },
}

const v$ = useVuelidate(rules, formData)

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }

  pending.value = true
  errorMessage.value = null

  try {
    const response = await $fetch('/api/coupons/add', {
      method: 'POST',
      body: formData,
    })
    cartState.value = response
  } catch (error: any) {
    errorMessage.value = error.data.data.message
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <app-form
    :loading="pending"
    button-title="Waardebon toepassen"
    :error="errorMessage"
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
