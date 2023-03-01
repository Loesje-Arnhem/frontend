<script lang="ts" setup>
import { IPage } from '~~/interfaces/IPage'
import { IPosts } from '~~/interfaces/IPost'
import { GetPagePosts } from '~/graphql/Pages/Pages'

defineI18nRoute({
  paths: {
    nl: '/over-loesje/nieuws',
  },
})

const { data, pending } = await useAsyncQuery<{
  page: IPage
  posts: IPosts
}>(GetPagePosts)
</script>

<template>
  <app-loader v-if="pending" />
  <div v-else-if="data">
    <h1 class="sr-only">{{ data.page.title }}</h1>
    <posts-overview-section :posts="data.posts" />
    <related-posters-section :posters="data.page.relatedPosters" />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>
