<template>
  <div>
    <poster-navigation />
    <nuxt-child />
  </div>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      nl: '/posters',
    },
  },
}
</script>
