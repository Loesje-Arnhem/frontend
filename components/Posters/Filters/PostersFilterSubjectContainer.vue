<template>
  <apollo-query :query="require('~/graphql/Posters/Subjects.gql')">
    <template v-slot="{ result: { data }, isLoading }">
      <app-loader v-if="isLoading" />
      <poster-filter-tags
        v-else-if="data"
        :list="data.subjects.edges"
        taxonomy="subject"
      />
    </template>
  </apollo-query>
</template>

<script>
import AppLoader from '~/components/Shared/AppLoader.vue'
import PosterFilterTags from '~/components/Posters/Filters/PosterFilterTags.vue'

export default {
  components: {
    AppLoader,
    PosterFilterTags,
  },
}
</script>
