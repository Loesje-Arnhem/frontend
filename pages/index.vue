<script setup lang="ts">
import { GetPageHome } from '~/graphql/Pages/Pages'
import { IPage } from '~~/interfaces/IPage'
import { IPostsBase } from '~~/interfaces/IPost'
const { data } = await useAsyncQuery<{ page: IPage; posts: IPostsBase }>(
  GetPageHome,
)
</script>

<template>
  <latest-posts-section v-if="data" :posts="data.posts.edges" />
</template>
