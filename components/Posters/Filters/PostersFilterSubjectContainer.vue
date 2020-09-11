<template>
  <apollo-query :query="require('~/graphql/Posters/Subjects.gql')">
    <template v-slot="{ result: { data }, isLoading }">
      <app-loader v-if="isLoading" />
      <poster-filter-tags v-else-if="data" :list="data.subjects.edges" />
    </template>
  </apollo-query>
</template>

<script>
import PosterFilterTags from '~/components/Posters/Tags/PosterTagsList.vue'

export default {
  components: {
    PosterFilterTags,
  },
}
</script>
