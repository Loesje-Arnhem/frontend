<script setup lang="ts">
import { Endpoints } from '~~/enums/endpoints';

defineI18nRoute({
  paths: {
    nl: '/:pathMatch(.*)*',
  },
})

const route = useRoute()

const uri = computed(() => {
  const slugs = route.path.split('/').filter((url) => url !== '')
  return slugs[slugs.length - 1]
})

const { data, pending } = await useFetch(Endpoints.Page, {
  key: `page`,
  params: {
    slug: uri.value,
  },
  
})
// const { data, pending, error } = await useAsyncQuery<{
//   page: IPage | null
// }>(PageByByUri, {
//   uri: uri.value,
// })

// onError((error) => {
//   throw createError({
//     statusCode: 404,
//     message: error.message,
//     fatal: true,
//   })
// })

// onResult((response) => {
//   console.log(!response.data)
//   if (!response.data) {
//     throw createError({
//       statusCode: 404,
//       fatal: true,
//     })
//   }
//   useMeta(response.data)
// })

//

// useMeta(data)
</script>

<template>
  <app-loader v-if="pending" />
  <div v-else-if="data">
    <app-content
      :title="data.title"
      :content="data.content"
      :video="data.youtubeId"
    />
    <related-posters-section :posters="data.relatedPosters" />
    <related-products-section
      v-if="data.relatedProducts.length"
      :product-ids="data.relatedProducts"
    />
    <related-pages-section :parent-id="data.parentId" />
  </div>
</template>
