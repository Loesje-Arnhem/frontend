<template>
  <div>
    <h1 class="sr-only">{{ title }}</h1>
    <form-workshop />
    <BlockInstagram />
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
import FormWorkshop from '@/components/Blocks/FormWorkshop.vue'
import BlockInstagram from '@/components/Blocks/BlockInstagram.vue'

export default {
  components: {
    Posters,
    LatestPosts,
    Groups,
    FormWorkshop,
    BlockInstagram
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
