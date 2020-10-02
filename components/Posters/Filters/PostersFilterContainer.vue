<template>
  <apollo-query :query="require('~/graphql/Posters/Sources.gql')">
    <template #default="data">
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
