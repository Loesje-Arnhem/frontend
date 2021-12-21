<template>
  <div />
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'none',
  setup() {
    const { app } = useContext()
    app.apolloProvider.defaultClient.resetStore()
  },
})
</script>
