import { useContext, ref } from '@nuxtjs/composition-api'

export default ($v, form, rules) => {
  const { $axios } = useContext()
  const submitted = ref(false)
  const loading = ref(true)

  const encodeFormData = (data) => {
    return Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`,
      )
      .join('&')
  }

  const submit = async () => {
    $v.value.$touch()
    if ($v.value.$invalid) return
    loading.value = true

    try {
      await $axios.$post('/', encodeFormData(form), {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      submitted.value = true
    } catch (error) {
    } finally {
      loading.value = true
    }
  }

  return {
    loading,
    submit,
    submitted,
  }
}
