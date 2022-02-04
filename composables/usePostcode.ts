import { reactive, ref } from '@nuxtjs/composition-api'
import { v4 } from 'uuid'
import { useMutation } from '@vue/apollo-composable/dist'
import CheckPostcodeMutation from '~/graphql/Customer/CheckPostcode.gql'

export default () => {
  const form = reactive({
    houseNumber: 35,
    postcode: '6708RC',
    country: '',
    street: '',
    city: '',
  })
  const errors = ref([] as string[])

  const {
    mutate: checkPostcode,
    loading,
    onError,
    // onDone,
  } = useMutation(CheckPostcodeMutation, () => ({
    variables: {
      clientMutationId: v4(),
      houseNumber: form.houseNumber,
      postcode: form.postcode,
    },
  }))
  onError(({ graphQLErrors }) => {
    errors.value = graphQLErrors.map((err) => err.message)
  })
  // onDone((result) => {
  // console.log(result.data)
  // })
  return {
    errors,
    form,
    loading,
    checkPostcode,
  }
}
