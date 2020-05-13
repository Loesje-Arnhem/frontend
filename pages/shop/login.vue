<template>
  <div>
    <form-login />
  </div>
</template>

<script>
import FormLogin from '~/components/Blocks/FormLogin.vue'
export default {
  components: {
    FormLogin,
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/inloggen',
    },
  },
}
</script>
