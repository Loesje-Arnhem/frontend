<template>
  <apollo-query
    :query="require('~/graphql/Posters/Posters.gql')"
    :variables="{ first, where }"
  >
    <template v-slot="{ result: { data }, isLoading }">
      <slot v-if="data" :posters="data.posters.edges" />
      <app-loader v-if="isLoading" />
    </template>
  </apollo-query>
</template>

<script>
import AppLoader from '~/components/Shared/AppLoader.vue'

export default {
  components: {
    AppLoader,
  },
  props: {
    first: {
      type: Number,
      default: 20,
    },
    posterIds: {
      type: Array,
      default: () => [],
    },
    subjects: {
      type: Array,
      default: () => [],
    },
    search: {
      type: String,
      default: null,
    },
  },
  computed: {
    where() {
      if (this.posterIds.length) {
        return {
          in: this.posterIds,
        }
      }

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
        search: this.search,
        taxQuery,
      }
    },
  },
}
</script>
