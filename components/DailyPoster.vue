<template>
  <app-loader v-if="loading" />
  <img
    v-else-if="dailyPoster"
    :src="dailyPoster.image"
    :alt="dailyPoster.title"
    width="188"
    height="300"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import DailyPostersQuery from '~/graphql/Posters/DailyPoster.gql'

export default defineComponent({
  setup() {
    const date = new Date()
    const { result, loading } = useQuery(DailyPostersQuery, {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    })
    const dailyPoster = useResult(result, null, (data) => {
      return {
        title: data.dailyPosters.edges[0].node.title,
        image: data.dailyPosters.edges[0].node.featuredImage.node.medium,
      }
    })

    return {
      loading,
      dailyPoster,
      result,
    }
  },
})
</script>
