<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/doe-mee/blijf-op-hoogte/',
  },
})
const { pageIds } = useAppConfig()

const { data } = await usePageById(pageIds.newsletter)
</script>

<template>
  <div
    v-if="data?.page"
    class="page"
  >
    <app-content
      :title="data.page.title"
      :content="data.page.content"
      :video="data.page?.videoGroup?.youtubeId"
    />
    <!-- <center-wrapper size="md">
      <form-newsletter class="newsletter" />
    </center-wrapper> -->
    <related-posters-section :posters="data.page.relatedPosters" />
    <!-- <related-products-section
      v-if="data.relatedProducts.length"
      :product-ids="data.relatedProducts"
    /> -->
    <related-pages-section :pages="data.page.relatedPages" />
  </div>
</template>

<style scoped lang="postcss">
.newsletter {
  max-width: var(--container-width-sm);
  margin-bottom: 4em;
}
</style>
