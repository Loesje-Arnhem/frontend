<script setup lang="ts">
// import { GetPageHome } from '~/graphql/Pages/Pages'
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
    <!-- <related-products-section :related-products="page.relatedProducts" /> -->
  </div>
</template>

<!-- <script lang="ts">
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
</script> -->
