<template>
  <apollo-query
    :query="require('~/graphql/Posters/Posters.gql')"
    :variables="{ first, where }"
  >
    <template v-slot="{ result: { data }, isLoading, query }">
      <template v-if="data">
        <slot :posters="data.posters.edges" />
        <client-only>
          <load-more
            v-if="showMore"
            :state="state(data, isLoading)"
            @loadMore="loadMore(query, data)"
          />
        </client-only>
      </template>
      <app-loader v-if="isLoading" />
    </template>
  </apollo-query>
</template>

<script>
import LoadMore from '~/components/LoadMore/LoadMoreByScroll.vue'

export default {
  components: {
    LoadMore,
  },
  props: {
    showMore: {
      type: Boolean,
      default: false,
    },
    first: {
      type: Number,
      default: 20,
    },
    notIn: {
      type: Number,
      default: 0,
    },
    posterIds: {
      type: Array,
      default: () => [],
    },
    subjects: {
      type: Array,
      default: () => [],
    },
    sources: {
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
      if (this.sources.length) {
        taxQuery = {
          taxArray: [
            {
              terms: this.sources,
              taxonomy: 'SOURCE',
              operator: 'IN',
            },
          ],
        }
      }
      return {
        notIn: [this.notIn],
        search: this.search,
        taxQuery,
      }
    },
  },
  methods: {
    state(data, isLoading) {
      if (!data.posters.pageInfo.hasNextPage) {
        return 'complete'
      } else if (isLoading > 0) {
        return 'loading'
      }
      return 'loaded'
    },
    async loadMore(query, data) {
      const { endCursor } = data.posters.pageInfo
      await query.fetchMore({
        variables: {
          after: endCursor,
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newPosters = fetchMoreResult.posters

          return {
            posters: {
              __typename: previousResult.posters.__typename,
              pageInfo: newPosters.pageInfo,
              // Merging the tag list
              edges: [...previousResult.posters.edges, ...newPosters.edges],
            },
          }
        },
      })
    },
  },
}
</script>
