<template>
  <div>
    <h1 v-if="page" class="sr-only">{{ page.title }}</h1>
    <latest-posts-section v-if="posts" :posts="posts.edges" />
    <related-posters-section v-if="page" :posters="page.relatedPosters" />
    <lazy-app-stores-section />
    <related-products-section
      v-if="page"
      :related-products="page.relatedProducts"
    />
    <!-- <block-instagram /> -->
    <lazy-block-groups />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePageHome } from '~/composables/usePage'

export default defineComponent({
  setup() {
    const { page, loading, posts } = usePageHome()
    return {
      posts,
      page,
      loading,
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
