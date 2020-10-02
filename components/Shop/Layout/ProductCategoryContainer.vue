<template>
  <apollo-query :query="require('~/graphql/ProductCategories.gql')">
    <template #default="{ result: { data }, isLoading }">
      <app-loader v-if="isLoading" />
      <slot
        v-else-if="data"
        :productCategories="data.productCategories.edges"
      />
    </template>
  </apollo-query>
</template>
