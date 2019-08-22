<template>
  <div>
    <h1>{{ poster.title.rendered }}</h1>
    <img class="poster" :src="poster.fimg_url" :alt="poster.title.rendered" />
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data() {
    return {
      title: '',
      text: '',
      date: ''
    }
  },

  async asyncData({ params }) {
    const response = await axios.get(`wp/v2/poster/`, {
      params: {
        slug: params.slug
      }
    })
    const post = response.data[0]

    return {
      title: post.title.rendered,
      poster: post
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
.text {
  max-width: 60ch;
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
