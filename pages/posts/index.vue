<template>
  <app-loader v-if="loading" />
  <div v-else-if="page">
    <h1 class="sr-only">{{ page.title }}</h1>
    <posts-overview-section v-if="posts" :posts="posts" />
    <related-posters-section :posters="page.relatedPosters" />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ComputedRef,
  useMeta,
} from '@nuxtjs/composition-api'
import { GetPagePosts } from '~/graphql/Pages/Pages'
import useFetch from '~/composables/useFetch'
import { IPage } from '~/interfaces/IPage'
import { IPosts } from '~/interfaces/IPost'

export default defineComponent({
  setup() {
    const { result, loading } = useFetch({
      query: GetPagePosts,
      pageKey: 'page-posts',
    })

    const page: ComputedRef<IPage | null> = computed(() => {
      return result.value?.page
    })
    const posts: ComputedRef<IPosts | null> = computed(() => {
      return result.value?.posts
    })

    useMeta(() => ({ title: page.value?.title }))

    return {
      loading,
      posts,
      page,
    }
  },
  head: {},
  nuxtI18n: {
    paths: {
      nl: '/over-loesje/nieuws',
    },
  },
})
</script>
