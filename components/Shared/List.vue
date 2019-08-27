<template>
  <div v-if="posters.edges.length">
    <transition-group name="list" tag="ul" class="list">
      <li
        v-for="poster in posters.edges"
        :key="poster.node.posterId"
        class="list-item"
      >
        <poster-tile v-if="poster.node" :poster="poster" class="link" />
      </li>
    </transition-group>
    <!-- <InfiniteLoading
      ref="infiniteLoading"
      :identifier="infiniteId"
      @infinite="getPosters"
    >
      <span slot="no-more" />
      <app-loader slot="spinner" />
      <span slot="no-results" class="no-results">
        <span v-if="!posters.length">There are no assets found</span>
      </span>
    </InfiniteLoading>-->
  </div>
</template>

<script>
// import InfiniteLoading from 'vue-infinite-loading'
import axios from '~/plugins/axios'
import PosterTile from '@/components/Poster/PosterTile.vue'
// import AppLoader from '@/components/Shared/AppLoader.vue'
import PostersQuery from '~/graphql/Posters.gql'

export default {
  components: {
    PosterTile
    // InfiniteLoading,
    // AppLoader
  },
  props: {
    search: {
      type: String,
      default: null
    },
    subjects: {
      type: Array,
      default: () => {}
    },
    sources: {
      type: Array,
      default: () => {}
    },
    exclude: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      posters: [],
      infiniteId: +new Date(),
      pageSize: 20,
      page: 1
    }
  },
  watch: {
    search() {
      this.resetSearch()
    },
    subjects() {
      this.resetSearch()
    },
    sources() {
      this.resetSearch()
    }
  },
  apollo: {
    // Pages
    posters: {
      query: PostersQuery,
      variables: {
        first: 20,
        search: 'wilders',
        notIn: []
      }
    }
  },
  methods: {
    async getPosters($state) {
      const response = await axios.get('wp/v2/poster', {
        params: {
          search: this.search,
          per_page: this.pageSize,
          page: this.page,
          subject: this.subjects,
          source: this.sources,
          exclude: this.exclude,
          _embed: '1'
        }
      })

      this.page = this.page + 1
      this.posters = this.posters.concat(response.data)

      if (this.page >= response.headers['x-wp-totalpages']) {
        $state.complete()
      } else {
        $state.loaded()
      }
    },
    resetSearch() {
      this.posters = []
      this.page = 1
      this.$nextTick(() => {
        this.infiniteId += 1
      })
    }
  },
  beforeRouteUpdate() {
    this.infiniteId += 1
  }
}
</script>

<style scoped>
.list {
  @mixin list-reset;
  background: url('/images/backgrounds/wall.jpg');
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
}
</style>
