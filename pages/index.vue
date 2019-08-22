<template>
  <div>
    <DailyPoster />
    <h1 class="sr-only">{{ title }}</h1>
    <latest-posts />
    <Posters :posters="posters" />
    <groups />
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Posters from '@/components/Blocks/Posters.vue'
import LatestPosts from '@/components/Blocks/LatestPosts.vue'
import Groups from '@/components/Blocks/Groups.vue'
import DailyPoster from '@/components/DailyPoster.vue'

export default {
  components: {
    Posters,
    LatestPosts,
    Groups,
    DailyPoster
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
