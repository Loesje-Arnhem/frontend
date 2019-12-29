<template>
  <div v-if="posters">
    <posters-overview-list :posters="posters.edges" />
    <InfiniteLoading
      ref="infiniteLoading"
      :identifier="infiniteId"
      @infinite="loadMorePosters"
    >
      <span slot="no-more" />
      <app-loader slot="spinner" />
      <template slot="no-results">
        <span v-if="!posters.edges.length" class="no-results">
          {{ $t('noPostersFound') }}
        </span>
      </template>
    </InfiniteLoading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import PostersOverviewList from '@/components/Posters/PostersOverview/PostersOverviewList.vue'
import AppLoader from '@/components/Shared/AppLoader.vue'
import PostersQuery from '~/graphql/PostersAutocomplete.gql'

export default {
  components: {
    PostersOverviewList,
    AppLoader,
    InfiniteLoading
  },
  data() {
    return {
      infiniteId: +new Date(),
      endCursor: null
    }
  },
  apollo: {
    posters: {
      query: PostersQuery,
      variables: {
        first: 20
      }
    }
  },

  methods: {
    async loadMorePosters($state) {
      await this.$apollo.queries.posters.fetchMore({
        variables: {
          after: this.endCursor
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          this.endCursor = fetchMoreResult.posters.pageInfo.endCursor
          const newPosters = fetchMoreResult.posters
          if (fetchMoreResult.posters.pageInfo.hasNextPage) {
            $state.loaded()
          } else {
            $state.complete()
          }
          return {
            posters: {
              __typename: previousResult.posters.__typename,
              pageInfo: newPosters.pageInfo,
              // Merging the tag list
              edges: [...previousResult.posters.edges, ...newPosters.edges]
            }
          }
        }
      })
    }
  }
}
</script>

<i18n>
{
  "nl": {
    "noPostersFound": "Er zijn geen posters gevonden."
  }
}
</i18n>
