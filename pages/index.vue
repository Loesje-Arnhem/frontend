<script setup lang="ts">
import { GetPageHome } from '~/graphql2/pages'

defineI18nRoute({
  paths: {
    nl: '/',
  },
})

const { pageIds } = useAppConfig()

const { result } = useQuery(GetPageHome, {
  id: pageIds.home.toString(),
})

useMeta(result.value?.page)
</script>

<template>
  <div>
    <h1 v-if="result?.page" class="sr-only">
      {{ result.page?.title }}
    </h1>

    <form-donate />

    <latest-posts-section :posts="result?.posts" />
    <related-posters-section
      v-if="result?.page"
      :posters="result.page.relatedPosters"
      :title="result.page.relatedPostersGroup?.title"
    />
    <app-stores-section />
    <related-products-section
      v-if="result?.page?.relatedProducts"
      :products="result.page.relatedProducts"
    />
  </div>
</template>
