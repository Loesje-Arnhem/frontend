<script setup lang="ts">
import { GetPageByID } from '~/graphql/pages'

defineI18nRoute({
  paths: {
    nl: '/winkeltje/afrekenen',
  },
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncQuery(GetPageByID, {
  id: pageIds.checkout.toString(),
})

useMeta(data.value?.page)

const {
  // checkout,
  // paymentMethod,
  billing,
  // shipping,
  // shipToDifferentAddress,
  // addToNewsletter,
  loading,
  errors,
} = useCheckout()
</script>

<template>
  <center-wrapper>
    <app-form
      class="form"
      button-title="Bestelling plaatsen"
      :loading="loading"
      :error="errors.join('')"
      @submit="submit"
    >
      <h1 v-if="data">{{ data.page?.title }}</h1>
      <address-fields
        id="billing"
        v-model:firstName="billing.firstName"
        v-model:last-name="billing.lastName"
        v-model:company="billing.company"
      />
    </app-form>

    <div class="checkout"></div>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
.checkout {
  display: grid;
  grid-gap: 1em;

  @media (--viewport-lg) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
