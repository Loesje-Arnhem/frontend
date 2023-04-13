<script setup lang="ts">
// import PageByByUri from '~/graphql/Pages/PageByUri.gql'
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
//   () => GqlGetPageByByUri({ uri: uri.value, }))
// )

const { data, pending, error } = await useAsyncGql('GetPageByByUri', {
  uri: uri.value,
})

const page = computed(() => {
  if (!data.value?.page) {
    return null
  }
  const result= data.value.page;
  return {
    title: result.title || '',
    content: result.content || '',
    video: result.videoGroup?.youtubeId
  }
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
  <div v-else-if="data?.page">
    <app-content
      :title="data.page.title || ''"
      :content="data.page.content || ''"
      :video="data.page?.videoGroup?.youtubeId"
    />
    <related-pages-section :pages="data.page.relatedPages" />
  </div>
</template>
