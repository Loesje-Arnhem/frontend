<template>
  <form class="form">
    <form-fieldset title="Factuurgegevens" class="fields">
      <form-input-text
        :id="`${id}-firstName`"
        :value="firstName"
        title="Voornaam"
        class="first-name"
        :errors="v$.firstName.$errors"
        name="firstName"
        autocomplete="given-name"
        @input="$emit('input', 'firstName', $event)"
        @change="$emit('input', 'firstName', $event)"
      />
      <form-input-text
        :id="`${id}-lastName`"
        :value="user.lastName"
        title="Achternaam"
        class="last-name"
        name="lastName"
        autocomplete="family-name"
        :errors="v$.lastName.$errors"
        @input="$emit('input', 'lastName', $event)"
        @change="$emit('input', 'lastName', $event)"
      />
      <form-input-text
        :id="`${id}-companyName`"
        :value="user.company"
        class="company-name"
        title="Bedrijfsnaam"
        name="companyName"
        @input="$emit('input', 'company', $event)"
      />
    </form-fieldset>
    <user-address-fields :user="user" />
    <form-fieldset v-if="!isShipping" title="Factuurgegevens">
      <form-input-text
        :id="`${id}-email`"
        :value="user.email"
        title="E-mailadres"
        type="email"
        class="email"
        name="email"
        :errors="v$.email.$errors"
        autocomplete="email"
        @input="$emit('input', 'email', $event)"
      />
    </form-fieldset>
  </form>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default defineComponent({
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    firstName: {
      type: String,
      default: '',
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

    const form = computed(() => props.user)

    const rules = {
      firstName: { required },
      lastName: { required },
      email: { required, email },
    }

    const v$ = useVuelidate(rules, form)

    return {
      id,
      v$,
    }
  },
})
</script>

<style lang="postcss" scoped>
.form {
  @mixin block;
}

.first-name,
.last-name,
.postcode,
.street,
.city {
  grid-column: span 2;
}

.email,
.country,
.company-name {
  grid-column: span 4;
}
</style>
