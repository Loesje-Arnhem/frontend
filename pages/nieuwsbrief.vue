<template>
  <div>
    {{ response }} {{ error }}
    <input v-model="form.email" type="text" />
    <button @click="submit">Click</button>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import useNewsletter from '~/compositions/newsletter'
export default defineComponent({
  layout: 'none',
  setup() {
    const { submit, form, response, error } = useNewsletter()

    return {
      submit,
      form,
      response,
      error,
    }
  },
})
</script>
