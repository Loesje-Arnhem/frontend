<template>
  <shop-wrapper>
    <h1>Registreren</h1>
  </shop-wrapper>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: ['auth'],
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/registreren',
    },
  },
})
</script>
