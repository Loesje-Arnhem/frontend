<script setup lang="ts">
import { GetPageByID } from '~/graphql/pages'

defineI18nRoute({
  paths: {
    nl: '/winkeltje/mijn-account',
  },
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncQuery(GetPageByID, {
  id: pageIds.cart.toString(),
})

useMeta(data.value?.page)
</script>

<template>
  <center-wrapper size="sm">
    <form-login />
  </center-wrapper>
</template>
