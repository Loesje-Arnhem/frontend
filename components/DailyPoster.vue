<template>
  <nuxt-picture
    v-if="dailyPoster"
    :src="dailyPoster.image"
    :alt="dailyPoster.title"
    preset="base"
    format="avif"
    preload
    width="188"
    height="300"
    sizes="xs:200px sm:400px"
  />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import DailyPostersQuery from '~/graphql/Posters/DailyPoster.gql'

export default defineComponent({
  data() {
    return {
      poster: {
        edges: [],
      },
    }
  },
  async fetch() {
    const date = new Date()
    const result = await this.$apollo.query({
      query: DailyPostersQuery,
      variables: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      },
    })
    if (result.data) {
      this.poster = result.data.dailyPosters
    }
  },
  computed: {
    dailyPoster() {
      if (!this.poster.edges.length) {
        return null
      }
      return {
        title: this.poster.edges[0].node.title,
        image: this.poster.edges[0].node.featuredImage.node.medium,
      }
    },
  },
})
</script>
