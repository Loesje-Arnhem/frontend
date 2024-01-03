<script setup lang="ts">
import { GetPageHome } from '~/graphql/pages'

defineI18nRoute({
  paths: {
    nl: '/',
  },
})

const { pageIds } = useAppConfig()

const { data } = useAsyncQuery(GetPageHome, {
  id: pageIds.home.toString(),
})

// if (!data.value.page) {
//   throw createError({
//     statusCode: 404,
//     statusMessage: 'Page Not Found',
//   })
// }

// useSchemaOrg(
//   defineWebPage({
//     description: data.value.page,
//   }),
// )

useMeta(data.value?.page)
</script>

<template>
  <div>
    <h1 v-if="data.page" class="sr-only">
      {{ data.page?.title }}
    </h1>

    <block-donate />

    <latest-posts-section :posts="data.posts" />
    <related-posters-section
      v-if="data.page"
      :posters="data.page.relatedPosters"
      :title="data.page.relatedPostersGroup?.title"
    />
    <app-stores-section />
    <related-products-section
      v-if="data.page?.relatedProducts"
      :products="data.page.relatedProducts"
    />
  </div>
</template>
