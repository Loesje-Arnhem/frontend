<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { GetPageByID } from '~/graphql/pages'

defineI18nRoute({
  paths: {
    nl: '/winkeltje/afrekenen',
  },
})

const payment = ref('')

const { pageIds } = useAppConfig()

const { data } = await useAsyncQuery(GetPageByID, {
  id: pageIds.checkout.toString(),
})

useMeta(data.value?.page)

const v$ = useVuelidate()

const {
  checkout,
  // paymentMethod,
  billing,
  // shipping,
  // shipToDifferentAddress,
  // addToNewsletter,
  loading,
  errors,
} = useCheckout()

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }

  await checkout({ billing })
}
</script>

<template>
  <center-wrapper>
    <h1 v-if="data">{{ data.page.title }}</h1>
    <div class="checkout">
      <app-form
        class="form"
        button-title="Bestelling plaatsen"
        :loading="loading"
        :error="errors.join('')"
        @submit="submit"
      >
        <personal-info-fields
          id="billing"
          v-model:firstName="billing.firstName"
          v-model:last-name="billing.lastName"
          v-model:company="billing.company"
        />

        <address-fields
          id="billing"
          v-model:city="billing.city"
          v-model:street="billing.street"
          v-model:houseNumber="billing.houseNumber"
          v-model:postcode="billing.postcode"
        />

        <payment-gateways v-model="payment" />
      </app-form>
      <mini-cart />
    </div>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.checkout {
  display: grid;
  grid-gap: 1em;

  @media (--viewport-lg) {
    grid-template-columns: 2fr 1fr;
  }
}
</style>
