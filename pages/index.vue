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
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from '@nuxtjs/composition-api'
import { GetPageHome } from '~/graphql/Pages/Pages'
import useFetch from '~/composables/useFetch'
import { IPage } from '~/interfaces/IPage'
import { IPostsBase } from '~/interfaces/IPost'
import useMeta from '~/composables/useMeta'

export default defineComponent({
  setup() {
    const { result, loading } = useFetch({
      query: GetPageHome,
      pageKey: 'page-home',
    })

    const page: ComputedRef<IPage | null> = computed(() => result.value?.page)
    const posts: ComputedRef<IPostsBase | null> = computed(() => {
      return result.value?.posts
    })

    useMeta(page)

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
