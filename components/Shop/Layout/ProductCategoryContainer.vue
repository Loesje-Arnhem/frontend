<template>
  <apollo-query :query="require('~/graphql/ProductCategories.gql')">
    <template v-slot="{ result: { data }, isLoading }">
      <app-loader v-if="isLoading" />
      <slot
        v-else-if="data"
        :productCategories="data.productCategories.edges"
      />
    </template>
  </apollo-query>
</template>
