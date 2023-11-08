<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/winkeltje/[slug]',
  },
})

const route = useRoute()

const { data } = await useAsyncGql('GetProduct', {
  slug: route.params.slug as string,
})

// useMeta(data.value?.[r]y)
</script>


<template>
  <shop-wrapper>
    <product-details
      v-if="data.product"
      :product="data.product"
    />
  </shop-wrapper>
</template>