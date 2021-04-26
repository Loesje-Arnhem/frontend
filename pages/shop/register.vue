<template>
  <shop-wrapper>
    <h1>Registreren</h1>
  </shop-wrapper>
</template>

<script>
export default {
  middleware: 'isAuth',
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/registreren',
    },
  },
}
</script>
