<template>
  <app-loader v-if="loading" />
  <div v-else-if="post">
    <app-content
      :image="post.featuredImage"
      :title="post.title"
      :content="post.content"
      :date="post.date"
      :video="post.videoGroup.youtubeId"
      :class="$style.content"
    />

    <!-- <related-posters-section :related-posters="post.relatedPosters" /> -->
    <related-products-section :related-products="post.relatedProducts" />
    <posts-overview-section :not-in="post.databaseId" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePost } from '~/composables/usePost'

export default defineComponent({
  setup() {
    const { post, loading } = usePost()
    return {
      post,
      loading,
    }
  },
  head: {},
  nuxtI18n: {
    paths: {
      nl: '/over-loesje/nieuws/:slug',
    },
  },
})
</script>

<style lang="postcss" module>
.content {
  @mixin block;
}
</style>
