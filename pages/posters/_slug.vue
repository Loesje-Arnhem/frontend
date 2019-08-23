<template>
  <div class="wrapper">
    <h1 class="sr-only">{{ poster.title.rendered }}</h1>

    <Poster :poster="poster" class="poster" />
    <div class="content">
      <div class="meta-data">
        <post-date :date="poster.date" />
      </div>
    </div>
    <social-media-links
      :title="`Deel ${poster.title.rendered}`"
      :social-media="socialMedia"
    />
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import PostDate from '@/components/PostDate.vue'
import Poster from '@/components/Shared/Poster.vue'
import SocialMediaLinks from '@/components/Shared/SocialMediaLinks.vue'

export default {
  components: {
    PostDate,
    Poster,
    SocialMediaLinks
  },
  data() {
    return {
      title: '',
      text: '',
      date: ''
    }
  },
  computed: {
    socialMedia() {
      return {
        twitter: `https://twitter.com/share?text=${this.poster.title.rendered}&url=${this.poster.link}`,
        facebook: `https://www.facebook.com/sharer.php?u=${this.poster.link}&p=${this.poster.title.rendered}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${this.poster.link}&media=${this.poster.fimg_url}&description=${this.poster.title.rendered}`
      }
    }
  },

  async asyncData({ params }) {
    const response = await axios.get(`wp/v2/poster/`, {
      params: {
        slug: params.slug
      }
    })
    const poster = response.data[0]

    return {
      title: poster.title.rendered,
      poster
    }
  },
  methods: {
    addTag(item) {}
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
