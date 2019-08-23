<template>
  <div>
    <Posters :posters="posters" />
    <InfiniteLoading
      ref="infiniteLoading"
      :identifier="infiniteId"
      @infinite="getPosters"
    >
      <span slot="no-more" />
      <span slot="no-results" class="no-results">
        <span v-if="!posters.length">There are no assets found</span>
      </span>
    </InfiniteLoading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import axios from '~/plugins/axios'
import Posters from '@/components/Shared/Posters.vue'

export default {
  components: {
    Posters,
    InfiniteLoading
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
  methods: {
    async getPosters($state) {
      try {
        const response = await axios.get('wp/v2/poster', {
          params: {
            search: this.search,
            per_page: this.pageSize,
            page: this.page,
            subject: this.subjects,
            source: this.sources,
            exclude: this.exclude
          }
        })

        this.page = this.page + 1
        this.posters = this.posters.concat(response.data)

        if (this.page >= response.headers['x-wp-totalpages']) {
          $state.complete()
        } else {
          $state.loaded()
        }
      } catch (error) {
        console.error(error)
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
