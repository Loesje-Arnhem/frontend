<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import DailyPostersQuery from '~/graphql/Posters/DailyPoster'
import { IFeaturedImage } from '~~/interfaces/IMedia'

withDefaults(
  defineProps<{
    sizes?: string
  }>(),
  {
    sizes: '(max-width: 375px) 100vw, 270px',
  },
)

const date = new Date()
const { onResult } = useQuery(DailyPostersQuery, {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
})

const poster: { featuredImage: IFeaturedImage | null; title?: string } =
  reactive({
    featuredImage: null,
    title: undefined,
  })

onResult((result: any) => {
  if (result.data.dailyPosters.edges.length > 0) {
    const { node } = result.data.dailyPosters.edges[0]
    poster.featuredImage = node.featuredImage
    poster.title = node.title
  }
})
</script>

<template>
  <featured-image
    v-if="poster.featuredImage"
    :image="poster.featuredImage"
    :alt="poster.title"
    :sizes="sizes"
  />
</template>
