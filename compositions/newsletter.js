import { reactive, ref } from '@nuxtjs/composition-api'
import { v4 } from 'uuid'
import { useMutation } from '@vue/apollo-composable/dist'
import AddToNewsletterQuery from '~/graphql/Newsletter/AddToNewsletter.gql'

export default () => {
  const form = reactive({
    email: 'test@michielkoning.nl',
    firstName: 'test',
    lastName: 'test2',
    list: 'products',
  })
  const errors = ref([])

  const { mutate: addToNewsletter, loading, onError } = useMutation(
    AddToNewsletterQuery,
    () => ({
      variables: {
        clientMutationId: v4(),
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        list: form.list,
      },
    }),
  )
  onError(({ graphQLErrors }) => {
    errors.value = graphQLErrors.map((err) => err.message)
  })
  return {
    errors,
    form,
    loading,
    addToNewsletter,
  }
}

// export default () => {
//   const { $axios } = useContext()

//   const form = reactive({
//     email: null,
//     firstName: null,
//     lastName: null,
//   })
//   const response = ref(null)
//   const loading = ref(false)
//   const error = ref(null)

//   const submit = async () => {
//     loading.value = true
//     error.value = null
//     response.value = null
//     try {
//       const data = await $axios.post(
//         'https://jsonplaceholder.typicode.com/posts',
//         form,
//       )

//       response.value = await data.data
//     } catch (err) {
//       error.value = err
//     } finally {
//       loading.value = false
//     }
//   }
//   return {
//     response,
//     loading,
//     error,
//     form,
//     submit,
//   }
// }
