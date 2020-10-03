import { ref } from '@vue/composition-api'

export default ($v) => {
  const submitted = ref(false)

  // handle the submit of the form, only called
  // if the form is valid
  const submit = () => {
    $v.value.$touch()

    if ($v.value.$invalid) return
    submitted.value = true

    alert('Form Submitted')
  }
  return {
    submit,
    submitted,
  }
}
