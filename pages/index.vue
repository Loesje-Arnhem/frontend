<template>
  <div>
    <div class="page">
      <h1>{{ title }}</h1>
    </div>
    <latest-posts />

    <auto-complete />
    <Posters :posters="posters" />
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import AutoComplete from '@/components/Search/AutoComplete.vue'
import Posters from '@/components/Shared/Posters.vue'
import LatestPosts from '@/components/LatestPosts.vue'

export default {
  components: {
    AutoComplete,
    Posters,
    LatestPosts
  },
  data() {
    return {
      title: 'Home'
    }
  },
  async asyncData({ params }) {
    try {
      const response = await axios.get(`wp/v2/poster`)
      return {
        posters: response.data
      }
    } catch (error) {
      // console.error(error)
    }
  },

  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style scoped lang="postcss">
.page {
  @mixin center;
}
</style>
