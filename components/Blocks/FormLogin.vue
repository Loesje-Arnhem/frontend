<template>
  <form @submit.prevent="login" class="form">
    <div class="wrapper">
      <form-fieldset title="Factuurgegevens">
        <form-input-text
          id="userName"
          v-model="userName"
          title="Gebruikersnaam of e-mailadres"
          type="text"
          class="userName"
          name="userName"
        />
        <form-input-text
          id="password"
          v-model="password"
          title="Wachtwoord"
          type="password"
          class="password"
          name="password"
        />
      </form-fieldset>
      <app-button type="submit">Inloggen</app-button>
    </div>
  </form>
</template>

<script>
import FormFieldset from '~/components/Forms/FormFieldset.vue'
import FormInputText from '~/components/Forms/FormInputText.vue'
import AppButton from '~/components/Shared/AppButton.vue'
import LoginQuery from '~/graphql/Login.gql'

export default {
  components: {
    AppButton,
    FormFieldset,
    FormInputText
  },
  data() {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await this.$apollo.mutate({
          mutation: LoginQuery,
          variables: {
            login: {
              username: this.userName,
              password: this.password,
              clientMutationId: 'login'
            }
          }
        })
        await this.$apolloHelpers.onLogin(res.data.login.authToken)
      } catch (e) {
        window.console.error(e)
      }
    }
  }
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
