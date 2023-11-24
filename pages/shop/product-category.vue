<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/winkeltje/categorie/[category]/[[subcategory]]',
  },
})

const route = useRoute()

const { data } = await useAsyncGql('GetProductCategory', {
  slug:
    (route.params.subcategory as string) || (route.params.category as string),
})

useMeta(data.value?.productCategory)
</script>

<template>
  <shop-wrapper>
    <div v-if="data.productCategory">
      <h1>{{ data.productCategory.title }}</h1>
      <p
        v-if="data.productCategory.content"
        v-html="data.productCategory.content"
      />
    </div>

    <product-list :category-id="data.productCategory?.databaseId" />
  </shop-wrapper>
</template>
