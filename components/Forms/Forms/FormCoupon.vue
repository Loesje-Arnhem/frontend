<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'

const { mutate, loading, errors, code } = useAddCoupon()

const { required } = useValidators()

const rules = {
  code: { required },
}

const v$ = useVuelidate(rules, { code })

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }

  await mutate({ code: code.value })
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
      <form-input-text
        id="coupon"
        v-model="code"
        autocomplete="false"
        title="E-mailadres"
        :errors="v$.code.$errors"
      />
    </form-fieldset>
  </app-form>
</template>
