<template>
  <form class="form">
    <form-fieldset title="Factuurgegevens">
      <form-input-text
        :id="`${id}-firstName`"
        :value="user.firstName"
        title="Voornaam"
        class="firstName"
        name="firstName"
        autocomplete="given-name"
        @input="$emit('input', 'firstName', $event)"
      />
      <form-input-text
        :id="`${id}-lastName`"
        :value="user.lastName"
        title="Achternaam"
        class="lastName"
        name="lastName"
        autocomplete="family-name"
        @input="$emit('input', 'lastName', $event)"
      />
      <form-input-text
        :id="`${id}-companyName`"
        :value="user.company"
        class="companyName"
        title="Bedrijfsnaam"
        name="companyName"
        @input="$emit('input', 'company', $event)"
      />

      <form-input-text
        :id="`${id}-country`"
        :value="user.country"
        title="Land"
        class="country"
        name="country"
        autocomplete="country"
        @input="$emit('input', 'country', $event)"
      />
      <form-input-text
        :id="`${id}-postcode`"
        :value="user.postcode"
        title="Postcode"
        class="postcode"
        name="postcode"
        autocomplete="postal-code"
        @input="$emit('input', 'postcode', $event)"
      />
      <form-input-text
        :id="`${id}-houseNumber`"
        :value="user.houseNumber"
        title="Nr"
        type="number"
        class="houseNumber"
        name="houseNumber"
      />
      <form-input-text
        :id="`${id}-houseNumberAddition`"
        :value="user.houseNumberAddition"
        title="Toev"
        class="houseNumberAddition"
        name="houseNumberAddition"
      />
      <form-input-text
        :id="`${id}-street`"
        :value="user.street"
        title="Straat"
        class="street"
        name="street"
      />
      <form-input-text
        :id="`${id}-city`"
        :value="user.city"
        title="Plaats"
        class="city"
        name="city"
        @input="$emit('input', 'city', $event)"
      />
      <form-input-text
        v-if="!isShipping"
        :id="`${id}-email`"
        :value="user.email"
        title="E-mailadres"
        type="email"
        class="email"
        name="email"
        autocomplete="email"
        @input="$emit('input', 'email', $event)"
      />
    </form-fieldset>
  </form>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    isShipping: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const id = computed(() => {
      return props.isShipping ? `shipping` : 'user'
    })
    return {
      id,
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
