<template>
  <form class="form" @submit.prevent="login">
    <div class="wrapper">
      <form-fieldset title="Factuurgegevens">
        <form-input-text
          id="userName"
          v-model="customer.firstname"
          title="Gebruikersnaam of e-mailadres"
          type="text"
          class="userName"
          name="userName"
        />
        <form-input-text
          id="email"
          v-model="customer.email"
          title="E-mailadres"
          type="text"
          name="email"
        />
      </form-fieldset>
      {{ customer }}
      <app-button type="submit">Wijzigen</app-button>
      <p>{{ error }}</p>
    </div>
  </form>
</template>

<script>
import FormFieldset from '~/components/Forms/FormFieldset.vue'
import FormInputText from '~/components/Forms/FormInputText.vue'
import AppButton from '~/components/Shared/AppButton.vue'
import UserQuery from '~/graphql/User/User.gql'

export default {
  components: {
    AppButton,
    FormFieldset,
    FormInputText,
  },
  data() {
    return {
      password: '',
      error: null,
      customer: {
        firstname: null,
        email: null,
      },
    }
  },
  apollo: {
    customer: {
      query: UserQuery,
    },
  },
}
</script>

<style lang="postcss" scoped>
.form {
  @mixin block;

  & >>> .fields {
    grid-template-columns: repeat(2, 1fr);
  }
}

.wrapper {
  @mixin center;
}
</style>
