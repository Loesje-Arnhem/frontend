<template>
  <shop-wrapper>
    <form-login />
  </shop-wrapper>
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
