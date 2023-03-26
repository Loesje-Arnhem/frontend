<script lang="ts" setup>
import { IPage } from '~~/interfaces/IPage'
import { GetPagePosts } from '~/graphql/Pages/Pages'

defineI18nRoute({
  paths: {
    nl: '/over-loesje/nieuws',
  },
})

const { data, pending } = await useAsyncQuery<{
  page: IPage
}>(GetPagePosts)

useMeta(data.value?.page)
</script>

<template>
  <app-loader v-if="pending" />
  <div v-else-if="data">
    <h1 class="sr-only">{{ data.page.title }}</h1>
    <posts-overview-section />
    <related-posters-section :posters="data.page.relatedPosters" />
    :related-products="data.page.relatedProducts" />
  </div>
</template>
