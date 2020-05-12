<template>
  <apollo-query :query="require('~/graphql/Sources.gql')">
    <template v-slot="data">
      <posters-filter-section :data="data" :is-loading="isLoading > 0" />
    </template>
  </apollo-query>
</template>

<script>
import PostersFilterSection from '~/components/Posters/Filters/PostersFilterSection.vue'

export default {
  components: {
    PostersFilterSection,
  },
}
</script>
