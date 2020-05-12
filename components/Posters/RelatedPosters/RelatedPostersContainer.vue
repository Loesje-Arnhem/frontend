<template>
  <apollo-query
    :query="require('~/graphql/Posters.gql')"
    :variables="{ first: 5, where: where }"
  >
    <template v-slot="{ result: { data }, isLoading }">
      <slot v-if="data" :posters="data.posters.edges" />
      <app-loader v-if="isLoading" />
    </template>
  </apollo-query>
</template>

<script>
import AppLoader from '@/components/Shared/AppLoader.vue'

export default {
  components: {
    AppLoader,
  },
  props: {
    relatedPosters: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    subjects() {
      return this.relatedPosters.subjects.map((subject) => subject.databaseId)
    },
    posterIds() {
      if (this.relatedPosters.posters) {
        return this.relatedPosters.posters.map(
          (poster) => poster.poster.posterId,
        )
      }
      return []
    },
    where() {
      if (this.posterIds.length) {
        return {
          in: this.posterIds,
        }
      }

      const search = this.relatedPosters.search
      let taxQuery = null

      if (this.subjects.length) {
        taxQuery = {
          taxArray: [
            {
              terms: this.subjects,
              taxonomy: 'SUBJECT',
              operator: 'IN',
            },
          ],
        }
      }
      return {
        search,
        taxQuery,
      }
    },
  },
}
</script>
