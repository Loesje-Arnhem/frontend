<script setup lang="ts">
// import PageByByUri from '~/graphql/Pages/PageByUri.gql'
// import { Endpoints } from '~~/enums/endpoints';

defineI18nRoute({
  paths: {
    nl: '/[...slug]',
  },
})

const route = useRoute()

const uri = computed(() => {
  const slugs = route.params.slug.filter((slug) => slug !== '')
  return slugs.at(-1)
})

// const { data, pending } = await useAsyncData(
//   'page',
//   () => GqlGetPageByByUri({ uri: uri.value, }))
// )

const { data, error } = await useAsyncGql('GetPageByUri', {
  uri: uri.value,
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

if (data.value?.page === null || error.value) {
  throw createError({
    statusCode: 404,
    fatal: true,
  })
}

useMeta(data.value?.page)
</script>

<template>
  <div v-if="data?.page">
    <app-content
      :title="data.page.title"
      :content="data.page.content"
      :video="data.page?.videoGroup?.youtubeId"
    />
    <related-posters-section
      :posters="data.page.relatedPosters"
      :title="data.page.relatedPostersGroup?.title"
    />
    <related-pages-section :pages="data.page.relatedPages" />

    <related-products-section
      v-if="data?.page?.relatedProducts"
      :products="data.page.relatedProducts"
    />
  </div>
</template>
