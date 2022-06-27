<template>
  <img
    v-if="poster.image"
    :src="poster.image"
    :alt="poster.title"
    width="188"
    height="300"
  />
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable'
import DailyPostersQuery from '~/graphql/Posters/DailyPoster'

export default defineComponent({
  setup() {
    const date = new Date()
    const { onResult } = useQuery(
      DailyPostersQuery,
      {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      },
      {
        fetchPolicy: 'network-only',
      },
    )

    const poster = reactive({
      image: null,
      title: null,
    })

    onResult((result: any) => {
      if (result.dailyPosters.edges.length > 0) {
        poster.image =
          result.dailyPosters.edges[0].node.featuredImage.node.medium
        poster.title = result.dailyPosters.edges[0].node.title
      }
    })

    return {
      poster,
    }
  },
})
</script>
