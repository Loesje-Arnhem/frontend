<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/winkeltje/categorie/[category]/[[subcategory]]',
  },
})

const route = useRoute()

const { data } = await useAsyncData(
  `product-category-${route.params.category.toString()}-${route.params.subcategory.toString()}`,
  () =>
    $fetch('/api/product-categories/product-category', {
      params: {
        slug:
          route.params.subcategory.toString() ||
          route.params.category.toString(),
      },
    }),
)

// useMeta(data.value?.productCategory)
</script>

<template>
  <shop-wrapper v-if="data">
    <div>
      <h1>{{ data.title }}</h1>
      <p v-if="data.content" v-html="data.content" />
    </div>

    <product-list :category-id="data.id" />
  </shop-wrapper>
</template>
