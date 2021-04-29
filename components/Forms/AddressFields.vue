<template>
  <form class="form">
    <form-fieldset title="Factuurgegevens">
      <form-input-text
        id="firstName"
        v-model="form.firstName"
        title="Voornaam"
        class="firstName"
        name="firstName"
        autocomplete="given-name"
      />
      <form-input-text
        id="lastName"
        v-model="form.lastName"
        title="Achternaam"
        class="lastName"
        name="lastName"
        autocomplete="family-name"
      />
      <form-input-text
        id="companyName"
        v-model="form.billing.company"
        class="companyName"
        title="Bedrijfsnaam"
        name="companyName"
      />
      <form-input-text
        id="country"
        v-model="form.billing.country"
        title="Land"
        class="country"
        name="country"
        autocomplete="country"
      />
      <form-input-text
        id="postcode"
        v-model="form.billing.postcode"
        title="Postcode"
        class="postcode"
        name="postcode"
        autocomplete="postal-code"
        @change="searchAddress"
      />
      <form-input-text
        id="houseNumber"
        v-model="form.billing.houseNumber"
        title="Nr"
        type="number"
        class="houseNumber"
        name="houseNumber"
        @change="searchAddress"
      />
      <form-input-text
        id="houseNumberAddition"
        v-model="form.billing.houseNumberAddition"
        title="Toev"
        class="houseNumberAddition"
        name="houseNumberAddition"
        @change="searchAddress"
      />
      <form-input-text
        id="street"
        v-model="form.billing.street"
        title="Straat"
        class="street"
        name="street"
        readonly
      />
      <form-input-text
        id="city"
        v-model="form.billing.city"
        title="Plaats"
        class="city"
        name="city"
        readonly
      />
      <form-input-text
        id="email"
        v-model="form.email"
        title="E-mailadres"
        type="email"
        class="email"
        name="email"
        autocomplete="email"
      />
    </form-fieldset>
  </form>
</template>

<script>
import { useCustomer } from '~/compositions/customer'

export default {
  setup() {
    const { customer, form } = useCustomer()

    const searchAddress = () => {
      if (!form.postcode || !form.houseNumber) {
        form.street = ''
        return
      }
      form.street = 'test'
    }

    return {
      searchAddress,
      form,
      customer,
    }
  },
}
</script>

<style lang="postcss" scoped>
.form {
  @mixin block;

  & >>> .fields {
    grid-template-columns: repeat(4, 1fr);
  }
}

.firstName,
.lastName,
.postcode,
.street,
.city {
  grid-column: span 2;
}

.email,
.country,
.companyName {
  grid-column: span 4;
}
</style>
