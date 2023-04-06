<script setup lang="ts">
import { IPage } from '~/interfaces/IPage';
import PageByByUri from '~/graphql/Pages/Pages'
// import { Endpoints } from '~~/enums/endpoints';

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

// const { data, pending } = await useAsyncData(
//   'page',
//   () => $fetch(Endpoints.Page, {
//     params: {
//     slug: uri.value,
//     }
//   })
// )

const { data, pending, error } = await useAsyncQuery<{
  page: IPage | null
}>(PageByByUri, {
  uri: uri.value,
})

const page = computed(() => {
  return data.value?.page
})

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
  <div v-else-if="page">
    <app-content
      :title="page.title"
      :content="page.content"
    />
    <!-- <related-posters-section :posters="data.relatedPosters" />
    <related-products-section
      v-if="data.relatedProducts.length"
      :product-ids="data.relatedProducts"
    />
    <related-pages-section :parent-id="data.parentId" /> -->
  </div>
</template>
