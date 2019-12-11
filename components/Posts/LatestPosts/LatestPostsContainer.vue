<template>
  <apollo-query
    :query="require('~/graphql/Posts.gql')"
    :variables="{ first: 3 }"
  >
    <template slot-scope="{ result: { data }, isLoading }">
      <latest-posts-section :data="data" :is-loading="isLoading > 0" />
    </template>
  </apollo-query>
</template>

<script>
import LatestPostsSection from '@/components/Posts/LatestPosts/LatestPostsSection.vue'

export default {
  components: {
    LatestPostsSection
  }
}
</script>
