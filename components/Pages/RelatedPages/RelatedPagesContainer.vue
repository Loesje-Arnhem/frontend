<template>
  <apollo-query
    :query="require('~/graphql/Pages/RelatedPages.gql')"
    :variables="{
      notIn,
      parentPageId: parentPageId.toString(),
    }"
  >
    <template v-slot="{ result: { data }, isLoading }">
      <app-loader v-if="isLoading" />
      <slot v-else-if="data && data.pages.edges" :pages="data.pages.edges" />
    </template>
  </apollo-query>
</template>

<script>
import AppLoader from '@/components/Shared/AppLoader.vue'

export default {
  components: {
    AppLoader,
  },
  props: {
    notIn: {
      type: Number,
      default: 0,
    },
    parentPageId: {
      type: Number,
      default: 0,
    },
  },
}
</script>
