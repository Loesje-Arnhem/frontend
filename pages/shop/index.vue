<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/winkeltje',
  },
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncGql('GetPageShop', {
  id: pageIds.shop.toString(),
})

useMeta(data.value?.page)
</script>

<template>
  <div>
    test
    {{ data }}
  </div>
</template>
