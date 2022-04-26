<template>
  <div>
    <h1 v-if="page" class="sr-only">{{ page.title }}</h1>
    <posts-overview-section v-if="posts" :posts="posts" />
    <template v-if="page">
      <related-posters-section :posters="page.relatedPosters" />
      <related-products-section :related-products="page.relatedProducts" />
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { usePagePosts } from '~/composables/usePage'

export default defineComponent({
  setup() {
    const { page, loading, posts } = usePagePosts()
    return {
      posts,
      page,
      loading,
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
