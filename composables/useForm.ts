import useVuelidate from '@vuelidate/core'
import type { ValidationArgs } from '@vuelidate/core'
import { Endpoints } from '~/enums/endpoints'

export default (
  rules: object,
  formData: ValidationArgs,
  endpoint: Endpoints.FormNewsletter | Endpoints.FormWorkshop,
) => {
  const { t } = useI18n()
  const loading = ref(false)
  const submitted = ref(false)
  const error = ref('')
  const v$ = useVuelidate(rules, formData)

  watch(
    () => v$.value.$invalid,
    (invalid) => {
      if (!invalid) {
        error.value = ''
      }
    },
  )

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) {
      error.value = t('invalidForm')
      return
    }

    loading.value = true

    try {
      const response = await $fetch(endpoint, {
        method: 'POST',
        body: formData,
      }).catch((err) => {
        error.value = t(err.data.message)
      })
      if (response === 1) {
        submitted.value = true
      }
    } finally {
      loading.value = false
    }
  }
  return {
    error,
    submit,
    v$,
    submitted,
    loading,
  }
}
