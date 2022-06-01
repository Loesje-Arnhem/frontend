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

    <related-posters-section :posters="post.relatedPosters" />
    <related-products-section :related-products="post.relatedProducts" />
    <posts-overview-section
      :posts="post.relatedPosts"
      :not-in="post.databaseId"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useRoute,
  useMeta,
  Ref,
} from '@nuxtjs/composition-api'
import { getPost } from '~/graphql/Posts/Posts'
import { IPost } from '~/interfaces/IPost'
import useFetch from '~/composables/useFetch'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { slug } = route.value.params

    const param = computed(() => slug)

    const { result, loading } = useFetch({
      query: getPost,
      usePayload: true,
      variables: {
        slug,
      },
      params: param,
      pageKey: 'post',
    })

    const post: Ref<IPost | null> = computed(() => result.value?.post)

    useMeta(() => ({ title: post.value?.title }))

    return {
      loading,
      post,
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
