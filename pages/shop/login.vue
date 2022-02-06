<template>
  <form-login />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/inloggen',
    },
  },
})
</script>
