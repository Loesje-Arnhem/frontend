<template>
  <div>
    <form class="form" @submit.prevent="login">
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
        <p>{{ error }}</p>
        <p>{{ user }}</p>
      </div>
    </form>
    <form v-if="user" class="form" @submit.prevent="update">
      <div class="wrapper">
        <form-fieldset title="Factuurgegevens">
          <form-input-text
            id="firstName"
            v-model="user.firstName"
            title="firstName"
            type="text"
            class="firstName"
            name="firstName"
          />
          <form-input-text
            id="lastName"
            v-model="user.lastName"
            title="Wachtwoord"
            class="lastName"
            name="lastName"
          />
        </form-fieldset>
        <app-button type="submit">Inloggen</app-button>
        <p>{{ error }}</p>
        <p>{{ user }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import FormFieldset from '~/components/Forms/FormFieldset.vue'
import FormInputText from '~/components/Forms/FormInputText.vue'
import AppButton from '~/components/Shared/AppButton.vue'
import LoginQuery from '~/graphql/Customer/Login.gql'
import UpdateCustomerMutation from '~/graphql/Customer/Update.gql'

export default {
  components: {
    AppButton,
    FormFieldset,
    FormInputText,
  },
  data() {
    return {
      userName: 'michiel',
      password: '',
      error: null,
      user: null,
    }
  },
  methods: {
    async login() {
      try {
        const res = await this.$apollo.mutate({
          mutation: LoginQuery,
          variables: {
            input: {
              username: this.userName,
              password: this.password,
              clientMutationId: 'login',
            },
          },
        })
        await this.$apolloHelpers.onLogin(res.data.login.authToken)
        this.user = res.data.login.customer
        // this.user = res.data.login.user
      } catch (error) {
        this.error = error
      }
    },
    async update() {
      try {
        const res = await this.$apollo.mutate({
          mutation: UpdateCustomerMutation,
          variables: {
            input: {
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              username: this.user.userName,
              id: this.user.id,
              clientMutationId: 'update',
            },
          },
        })
        // await this.$apolloHelpers.onLogin(res.data.login.authToken)
        this.user = res.data.login.customer
        // this.user = res.data.login.user
      } catch (error) {
        this.error = error
      }
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
