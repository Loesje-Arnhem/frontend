<template>
  <apollo-query
    :query="require('~/graphql/Posters.gql')"
    :variables="{ first: 5, where: where }"
  >
    <template slot-scope="{ result: { data }, isLoading }">
      <related-posters-list v-if="data" :posters="data.posters.edges" />
      <app-loader v-if="isLoading" />
    </template>
  </apollo-query>
</template>

<script>
import RelatedPostersList from '@/components/Posters/RelatedPosters/RelatedPostersList.vue'

export default {
  components: {
    RelatedPostersList
  },
  props: {
    relatedPosters: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    subjects() {
      return this.relatedPosters.subjects.map(subject => subject.subjectId)
    },
    search() {
      return this.relatedPosters.search
    },
    posterIds() {
      if (this.relatedPosters.posters) {
        return this.relatedPosters.posters.map(poster => poster.poster.posterId)
      }
      return []
    },
    where() {
      if (this.posterIds.length) {
        return {
          in: this.posterIds
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
              operator: 'IN'
            }
          ]
        }
      }
      return {
        search,
        taxQuery
      }
    }
  }
}
</script>
