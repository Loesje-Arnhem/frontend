import { reactive, useContext, ref } from '@nuxtjs/composition-api'

export default () => {
  const { $axios } = useContext()

  const form = reactive({
    email: null,
    firstName: null,
    lastName: null,
  })
  const response = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const submit = async () => {
    loading.value = true
    error.value = null
    response.value = null
    try {
      const data = await $axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        form,
      )

      response.value = await data.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }
  return {
    response,
    loading,
    error,
    form,
    submit,
  }
}
