<template>
  <div class="page">
    <h1>{{ title }}</h1>
    <!-- eslint-disable-next-line -->
    <div class="text" v-html="text" />
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
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
  @mixin block;
}
</style>
