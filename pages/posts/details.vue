<script lang="ts" setup>
import { getPost } from '~/graphql/Posts/Posts'
// import { IPost } from '~/interfaces/IPost'
// import useFetch from '~/composables/useFetch'
// import useMeta from '~/composables/useMeta'

defineI18nRoute({
  paths: {
    nl: '/over-loesje/nieuws/:slug',
  },
})

const route = useRoute()
const { data, pending } = await useAsyncQuery<{ post: IPost }>(
  getPost,
  {
    slug: route.params.slug,
  },
  // query: getPost,
  // usePayload: true,
  // variables: {
  //   slug,
  // },
  // params: param,
  // pageKey: 'post',
)

// useMeta(post)
</script>

<template>
  <app-loader v-if="pending" />
  <div v-else-if="data">
    <app-content
      :image="data.post.featuredImage"
      :title="data.post.title"
      :content="data.post.content"
      :date="data.post.date"
      :video="data.post.videoGroup.youtubeId"
    />

    <related-posters-section :posters="data.post.relatedPosters" />
    <related-products-section :related-products="data.post.relatedProducts" />
    <posts-overview-section
      :posts="data.post.relatedPosts"
      :not-in="data.post.databaseId"
    />
  </div>
</template>
