<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
const { mutate, loading, errors, formData } = useAddCoupon()

const { required, email } = useValidators()

const rules = {
  code: { required, email },
}

const v$ = useVuelidate(rules, formData)

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }

  await mutate({ code: formData.code })
}
</script>

<template>
  <app-form
    :loading="loading"
    button-title="Waardebon toepassen"
    :error="errors.join(',')"
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
