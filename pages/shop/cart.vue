<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/winkeltje/winkelwagen',
  },
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncGql('GetPageByID', {
  id: pageIds.cart.toString(),
})

useMeta(data.value?.page)
</script>

<template>
  <div />
</template>
