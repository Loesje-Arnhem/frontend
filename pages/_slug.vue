<template>
  <div class="page">
    <h1>{{ title }}</h1>
    <!-- eslint-disable-next-line -->
    <div class="text" v-html="text" />
    <auto-complete />
    <Posters :posters="posters" />
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import AutoComplete from '@/components/Search/AutoComplete.vue'
import Posters from '@/components/Shared/Posters.vue'

export default {
  components: {
    AutoComplete,
    Posters
  },
  data() {
    return {
      title: '',
      text: '',
      date: '',
      posters: []
    }
  },
  async asyncData({ params }) {
    const response = await axios.get(`wp/v2/pages`, {
      params: {
        slug: params.slug
      }
    })
    const post = response.data[0]

    return {
      title: post.title.rendered,
      text: post.content.rendered,
      date: post.date
    }
  },
  mounted() {
    this.getPosters()
  },
  methods: {
    async getPosters($state) {
      try {
        const response = await axios.get('wp/v2/poster')
        this.posters = this.posters.concat(response.data)
      } catch (error) {
        // console.error(error)
      }
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
