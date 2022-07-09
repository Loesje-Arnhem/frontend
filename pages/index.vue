<template>
  <div>
    <h1 v-if="page" class="sr-only">{{ page.title }}</h1>
    <app-loader v-if="loading" />
    <latest-posts-section v-if="posts" :posts="posts.edges" />
    <related-posters-section v-if="page" :posters="page.relatedPosters" />
    <app-stores-section />
    <related-products-section
      v-if="page"
      :related-products="page.relatedProducts"
    />
    <!-- <block-instagram /> -->
    <block-groups />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  Ref,
  useMeta,
} from '@nuxtjs/composition-api'
import { GetPageHome } from '~/graphql/Pages/Pages'
import useFetch from '~/composables/useFetch'
import { IPage } from '~/interfaces/IPage'
import { IPostsBase } from '~/interfaces/IPost'

export default defineComponent({
  setup() {
    const { result, loading } = useFetch({
      query: GetPageHome,
      pageKey: 'page-home',
    })

    const page: Ref<IPage | null> = computed(() => result.value?.page)
    const posts: Ref<IPostsBase | null> = computed(() => result.value?.posts)

    useMeta(() => ({ title: page.value?.title }))

    return {
      loading,
      posts,
      page,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/',
    },
  },
  head: {},
})
</script>
