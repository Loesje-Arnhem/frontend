<template>
  <div>
    <div v-if="posters">
      <posters-overview-list :posters="posters.edges" />
      <infinite-loading
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
      </infinite-loading>
    </div>
    <app-loader v-if="$apollo.queries.posters.loading" />
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import PostersOverviewList from '~/components/Posters/PostersOverview/PostersOverviewList.vue'
import AppLoader from '~/components/Shared/AppLoader.vue'
import PostersQuery from '~/graphql/Posters/Posters.gql'

export default {
  components: {
    PostersOverviewList,
    AppLoader,
    InfiniteLoading,
  },
  props: {
    notIn: {
      type: Number,
      default: 0,
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
  data() {
    return {
      infiniteId: +new Date(),
    }
  },
  computed: {
    where() {
      const where = {}

      if (this.notIn) {
        where.notIn = this.notIn
      }

      if (this.search) {
        where.search = this.search
      }

      const taxArray = []

      if (this.subjects.length) {
        const query = this.getTaxQueryByType(this.subjects, 'SUBJECT')
        taxArray.push(query)
      }

      if (this.sources.length) {
        const query = this.getTaxQueryByType(this.sources, 'SOURCE')
        taxArray.push(query)
      }

      if (taxArray.length) {
        where.taxQuery = { taxArray }
      }
      return where
    },
  },

  apollo: {
    posters: {
      query: PostersQuery,
      variables() {
        return {
          first: 24,
          where: this.where,
        }
      },
    },
  },

  methods: {
    getTaxQueryByType(tags, taxonomy) {
      return {
        terms: tags,
        taxonomy,
        operator: 'IN',
      }
    },

    async loadMorePosters($state) {
      await this.$apollo.queries.posters.fetchMore({
        variables: {
          after: this.posters.pageInfo.endCursor,
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
              edges: [...previousResult.posters.edges, ...newPosters.edges],
            },
          }
        },
      })
    },
  },
}
</script>

<i18n>
{
  "nl": {
    "noPostersFound": "Er zijn geen posters gevonden."
  }
}
</i18n>
