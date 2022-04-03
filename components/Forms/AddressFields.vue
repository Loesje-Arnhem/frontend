<template>
  <form class="form">
    <form-fieldset title="Factuurgegevens" class="fields">
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
    </form-fieldset>
    <user-address-fields :user="user" />
    <form-fieldset title="Factuurgegevens">
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

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
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
})
</script>

<style lang="postcss" scoped>
.form {
  @mixin block;
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
