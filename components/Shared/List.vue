<template>
  <div v-if="posters.edges.length">
    <transition-group name="list" tag="ul" class="list">
      <li
        v-for="poster in posters.edges"
        :key="poster.node.posterId"
        class="list-item"
      >
        <poster-tile v-if="poster.node" :poster="poster.node" class="link" />
      </li>
    </transition-group>
    <infinite-loading
      ref="infiniteLoading"
      :identifier="infiniteId"
      @infinite="getPosters"
    >
      <span slot="no-more" />
      <app-loader slot="spinner" />
      <span slot="no-results" class="no-results">
        <span v-if="!posters.edges.length">There are no assets found</span>
      </span>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import PosterTile from '~/components/Posters/Shared/PosterTile.vue'
import AppLoader from '~/components/Shared/AppLoader.vue'
import PostersQuery from '~/graphql/Posters/Posters.gql'

export default {
  components: {
    PosterTile,
    InfiniteLoading,
    AppLoader,
  },
  props: {
    search: {
      type: String,
      default: 'voetbal',
    },
    subjects: {
      type: Array,
      default: () => {},
    },
    sources: {
      type: Array,
      default: () => {},
    },
    exclude: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      posters: {
        edges: [],
      },
      infiniteId: +new Date(),
      pageSize: 20,
      page: 1,
    }
  },
  watch: {
    search() {
      this.resetSearch()
    },
    subjects() {
      // this.resetSearch()
      // window.console.log('subjects')
    },
    sources() {
      // this.resetSearch()
      // window.console.log('sources')
    },
  },
  apollo: {
    // Pages
    posters: {
      query: PostersQuery,
      // variables() {
      //   return {
      //     first: 20,
      //     search: this.search,
      //     notIn: []
      //   }
      // }
    },
  },
  methods: {
    getPosters($state) {
      this.$apollo.queries.posters.fetchMore({
        // New variables
        variables: {
          after: this.posters.pageInfo.endCursor,
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
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
              edges: [...previousResult.posters.edges, ...newPosters.edges],
            },
          }
        },
      })
    },

    resetSearch() {
      this.posters.edges = []
      this.page = 1
      this.$nextTick(() => {
        this.infiniteId += 1
      })
    },
  },
  beforeRouteUpdate() {
    this.infiniteId += 1
  },
}
</script>

<style scoped>
.list {
  @mixin list-reset;

  background: url('/images/backgrounds/wall.jpg');
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);

  @media (--viewport-sm) {
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  }
}
</style>
