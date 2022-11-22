import { useVuelidate } from '@vuelidate/core'
import {
  computed,
  ComputedRef,
  reactive,
  Ref,
  ref,
} from '@nuxtjs/composition-api'
import { v4 } from 'uuid'
import { useMutation } from '@vue/apollo-composable'
import AddToNewsletterQuery from '~/graphql/Newsletter/AddToNewsletter.gql'
import useValidators from '~/composables/useValidators'

export default () => {
  const formData = reactive({
    email: 'test@michielkoning.nl',
    firstName: '',
    lastName: '',
    list: 'products',
  })
  const errors: Ref<string[]> = ref([])
  const submitted = ref(false)
  const { required, email } = useValidators()

  const rules = {
    email: { required, email },
  }

  const v$ = useVuelidate(rules, formData)

  const error: ComputedRef<string | null> = computed(() => {
    if (apiError.value) {
      return apiError.value.message
    } else if (errors.value.length) {
      return `validations.${errors.value[0].toLowerCase()}`
    } else if (v$.value.$dirty && v$.value.$invalid) {
      return 'validations.form'
    }
    return null
  })

  const submit = async () => {
    errors.value = []
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) {
      return
    }

    addToNewsletter()
  }
  const {
    mutate: addToNewsletter,
    loading,
    error: apiError,
    onDone,
  } = useMutation(AddToNewsletterQuery, () => ({
    variables: {
      clientMutationId: v4(),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      list: formData.list,
    },
  }))

  onDone(({ data }) => {
    const response = JSON.parse(data.addToNewsletter.response)
    if (response.error) {
      errors.value.push(response.error.code)
    } else {
      submitted.value = response.status === 'SUBSCRIBED'
    }
  })
  return {
    submit,
    error,
    formData,
    loading,
    submitted,
    addToNewsletter,
    v$,
  }
}
