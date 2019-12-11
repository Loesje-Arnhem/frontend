<template>
  <apollo-query
    :query="require('~/graphql/Posters.gql')"
    :variables="{ first: 5 }"
  >
    <template slot-scope="{ result: { data }, isLoading }">
      <related-posters-section :data="data" :is-loading="isLoading > 0" />
    </template>
  </apollo-query>
</template>

<script>
import RelatedPostersSection from '@/components/Posters/RelatedPosters/RelatedPostersSection.vue'

export default {
  components: {
    RelatedPostersSection
  }
}
</script>
