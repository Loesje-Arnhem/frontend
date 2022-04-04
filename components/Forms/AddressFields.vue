<template>
  <form class="form">
    <form-fieldset title="Factuurgegevens" class="fields">
      <form-input-text
        :id="`${id}-firstName`"
        v-model="v$.firstName.$model"
        title="Voornaam"
        class="firstName"
        name="firstName"
        autocomplete="given-name"
        :errors="v$.firstName.$errors"
      />
      {{ firstName }}
      {{ v$.firstName.$errors }}
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

<script>
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

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

    const firstName = ref('')

    const rules = {
      firstName: { required },
    }

    const v$ = useVuelidate(rules, {
      firstName,
    })

    return {
      firstName,
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
