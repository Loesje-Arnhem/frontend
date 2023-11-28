<script setup lang="ts">
import { GetPageHome } from '~/graphql2/pages'

defineI18nRoute({
  paths: {
    nl: '/',
  },
})

const { pageIds } = useAppConfig()

const { data } = useAsyncQuery(GetPageHome, {
  id: pageIds.home.toString(),
})

useMeta(data.value?.page)
</script>

<template>
  <div>
    <h1 v-if="data.page" class="sr-only">
      {{ data.page?.title }}
    </h1>

    <form-donate />

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
