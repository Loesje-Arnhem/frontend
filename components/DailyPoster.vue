<template>
  <featured-image
    v-if="poster.featuredImage"
    :image="poster.featuredImage"
    :alt="poster.title"
    sizes="(max-width: 375px) 100vw, 270px"
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
      featuredImage: null,
      title: null,
    })

    onResult((result: any) => {
      if (result.data.dailyPosters.edges.length > 0) {
        const { node } = result.data.dailyPosters.edges[0]
        poster.featuredImage = node.featuredImage
        poster.title = node.title
      }
    })

    return {
      poster,
    }
  },
})
</script>
