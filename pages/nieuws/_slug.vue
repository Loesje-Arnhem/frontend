<template>
  <div>
    <div class="page">
      <h1>{{ title }}</h1>
      <post-date :date="date" />
      <!-- eslint-disable-next-line -->
      <div class="text" v-html="text" />
    </div>
    <latest-posts />
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import LatestPosts from '@/components/Blocks/LatestPosts.vue'
import PostDate from '@/components/PostDate.vue'

export default {
  components: {
    PostDate,
    LatestPosts
  },
  data() {
    return {
      title: '',
      text: '',
      date: ''
    }
  },

  async asyncData({ params }) {
    const response = await axios.get(`wp/v2/posts/`, {
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

<style lang="postcss" scoped>
.page {
  @mixin block;
  @mixin center var(--container-width-md);
}

time {
  font-size: 0.9em;
  color: var(--color-gray);
  margin-bottom: 1em;
  display: block;
}

>>> h1 {
  margin-bottom: 0.25rem;
}
</style>
