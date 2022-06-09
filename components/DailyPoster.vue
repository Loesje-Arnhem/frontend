<template>
<<<<<<< Updated upstream
  <div class="poster-daily">
    <div class="image-wrapper">
      <img
        v-if="dailyPoster"
        :src="dailyPoster.image"
        :alt="dailyPoster.title"
        preset="base"
        preload
        class="image"
        format="avif"
        width="188"
        height="300"
        sizes="xs:200px sm:400px"
      />
    </div>
    <nuxt-picture
      src="/images/electriciteitskastje.png"
      alt=""
      preload
      class="background"
      width="270"
      height="362"
      format="avif"
      preset="base"
      sizes="sm:80vw md:60vw lg:33vw xl:340 xxl:500"
    />
  </div>
=======
  <img
    v-if="dailyPoster"
    :src="dailyPoster.image"
    :alt="dailyPoster.title"
    width="188"
    height="300"
    crossorigin="anonymous"
  />
>>>>>>> Stashed changes
</template>

<script>
import DailyPostersQuery from '~/graphql/Posters/DailyPoster.gql'

export default {
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
}
</script>

<style lang="postcss" scoped>
.poster-daily {
  position: relative;
  max-width: 18em;
  width: 100%;
  margin: 0 auto -1em;
}

.image-wrapper {
  position: absolute;
  top: 9%;
  left: 17%;
  transform: rotate(-2deg);
  width: 72%;

  &::after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    box-shadow: inset 0 0 0 1px var(--color-white);
  }
}

.image {
  display: block;
}

.background {
  width: 100%;
  display: block;
}
</style>
