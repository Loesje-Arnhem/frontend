<template>
  <apollo-query
    :query="require('~/graphql/Menu/Menu.gql')"
    :variables="{
      joinPageId,
      aboutPageId,
    }"
  >
    <template v-slot="{ result: { data }, isLoading }">
      <app-loader v-if="isLoading" />
      <slot
        v-else-if="data"
        :about="data.about"
        :join="data.join"
        :productCategories="data.productCategories"
      />
    </template>
  </apollo-query>
</template>

<script>
import AppLoader from '~/components/Shared/AppLoader.vue'
import { joinPageId, aboutPageId } from '~/data/pages'

export default {
  components: {
    AppLoader,
  },
  data() {
    return {
      joinPageId,
      aboutPageId,
    }
  },
}
</script>
