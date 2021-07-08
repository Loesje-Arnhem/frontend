<template>
  <div class="poster-daily">
    <div class="image-wrapper">
      <app-image
        v-if="dailyPoster"
        :src="dailyPoster.image"
        :alt="dailyPoster.title"
        :lazy="false"
        class="image"
      />
    </div>
    <img
      src="/images/electriciteitskastje.png"
      alt=""
      class="background"
      width="339"
      height="390"
      quality="80"
      fit="inside"
      sizes="sm:80vw md:60vw lg:33vw xl:340 xxl:500"
    />
  </div>
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
  margin: 0 auto;
}

.image-wrapper {
  position: absolute;
  top: 20%;
  left: 22%;
  width: 65%;

  &::after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    box-shadow: inset 0 0 0 1px #fff;
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
