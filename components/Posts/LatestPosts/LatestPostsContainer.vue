<template>
  <apollo-query
    :query="require('~/graphql/Posts.gql')"
    :variables="{ first: 3 }"
  >
    <template slot-scope="{ result: { data }, isLoading }">
      <app-loader v-if="isLoading" />
      <slot v-if="data" :posts="data.posts.edges"></slot>
    </template>
  </apollo-query>
</template>

<script>
import AppLoader from '@/components/Shared/AppLoader.vue'

export default {
  components: {
    AppLoader
  }
}
</script>
