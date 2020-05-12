<template>
  <apollo-query
    :query="require('~/graphql/Posts/Posts.gql')"
    :variables="{ first: 3 }"
  >
    <template v-slot="{ result: { data }, isLoading }">
      <app-loader v-if="isLoading" />
      <slot v-if="data" :posts="data.posts.edges" />
    </template>
  </apollo-query>
</template>

<script>
import AppLoader from '~/components/Shared/AppLoader.vue'

export default {
  components: {
    AppLoader,
  },
}
</script>
