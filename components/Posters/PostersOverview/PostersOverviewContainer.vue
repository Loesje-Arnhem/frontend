<template>
  <div>
    <div v-if="posters">
      <posters-overview-list :posters="posters.edges" />
      <InfiniteLoading
        ref="infiniteLoading"
        :identifier="infiniteId"
        @infinite="loadMorePosters"
      >
        <span slot="no-more" />
        <span slot="spinner" />
        <template slot="no-results">
          <span v-if="!posters.edges.length" class="no-results">
            {{ $t('noPostersFound') }}
          </span>
        </template>
      </InfiniteLoading>
    </div>
    <app-loader v-if="$apollo.queries.posters.loading" />
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import PostersOverviewList from '@/components/Posters/PostersOverview/PostersOverviewList.vue'
import AppLoader from '@/components/Shared/AppLoader.vue'
import PostersQuery from '~/graphql/Posters.gql'
import selectedTagsQuery from '~/graphql/local/SelectedTags.gql'
import searchTextQuery from '~/graphql/local/SearchText.gql'

export default {
  components: {
    PostersOverviewList,
    AppLoader,
    InfiniteLoading
  },
  props: {
    notIn: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      infiniteId: +new Date()
    }
  },
  computed: {
    where() {
      let search = ''
      if (this.searchText) {
        search = this.searchText.searchText
      }
      let taxQuery = null
      if (this.selectedTagsIds.length) {
        taxQuery = {
          taxArray: [
            {
              terms: this.selectedTagsIds,
              taxonomy: 'SUBJECT',
              operator: 'IN'
            }
          ]
        }
      }
      return {
        search,
        notIn: this.notIn,
        taxQuery
      }
    },
    selectedTagsIds() {
      if (this.selectedTags) {
        return this.selectedTags.map(tag => tag.tagId)
      }
      return []
    }
  },

  apollo: {
    posters: {
      query: PostersQuery,
      variables() {
        return {
          first: 24,
          where: this.where
        }
      }
    },
    selectedTags: selectedTagsQuery,
    searchText: searchTextQuery
  },

  methods: {
    async loadMorePosters($state) {
      await this.$apollo.queries.posters.fetchMore({
        variables: {
          after: this.posters.pageInfo.endCursor
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newPosters = fetchMoreResult.posters
          if (newPosters.pageInfo.hasNextPage) {
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
