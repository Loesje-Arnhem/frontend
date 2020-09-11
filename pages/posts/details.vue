<template>
  <app-loader v-if="loading" />

  <div v-else-if="post">
    <app-content
      :title="post.title"
      :content="post.content"
      :date="post.date"
    />

    <related-posters-section
      v-if="post"
      :related-posters="post.relatedPosters"
    />
    <!-- <related-products-section :related-products="post.relatedProducts" /> -->
    <posts-overview-section :not-in="post.databaseId" />
  </div>
</template>

<script>
import { useContext, computed } from '@nuxtjs/composition-api'
import PostsOverviewSection from '~/components/Posts/Overview/PostsOverviewSection.vue'
import AppContent from '~/components/Shared/AppContent.vue'
import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
// import RelatedProductsSection from '~/components/Shop/Products/RelatedProducts/RelatedProductsSection.vue'
import { usePost } from '~/compositions/posts'

export default {
  setup() {
    const { params } = useContext()
    const uri = computed(() => params.value.slug)
    const { post, loading, error } = usePost(uri)

    return {
      post,
      loading,
      error,
    }
  },
  components: {
    AppContent,
    PostsOverviewSection,
    RelatedPostersSection,
    // RelatedProductsSection,
  },

  // head() {
  //   return {
  //     title: this.post.title,
  //   }
  // },
  nuxtI18n: {
    paths: {
      nl: '/over-mij/nieuws/:slug',
    },
  },
}
</script>
