<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/doe-mee/blijf-op-hoogte',
  },
})
const { pageIds } = useAppConfig()

const { data } = await useAsyncData(`page-workshop`, () =>
  $fetch('/api/pages/page', {
    params: {
      id: pageIds.newsletter,
    },
  }),
)

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

useMeta({
  title: data.value.title,
})
</script>

<template>
  <div v-if="data">
    <app-content
      :title="data.title"
      :content="data.content"
      :video="data.youtubeId"
    />
    <center-wrapper size="md">
      <form-newsletter class="newsletter" />
    </center-wrapper>
    <related-products-section
      v-if="data.relatedProducts"
      :title="data.relatedProducts.title"
      :product-ids="data.relatedProducts.productIds"
    />
    <related-posters-section
      :poster-ids="data.relatedPosters.posterIds"
      :search="data.relatedPosters.search"
      :subjects="data.relatedPosters.subjects"
      :title="data.relatedPosters.title"
    />
  </div>
</template>

<style lang="postcss" scoped>
.newsletter {
  max-width: var(--container-width-sm);
  margin-bottom: 4em;
}
</style>
