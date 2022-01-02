<template>
  <div>
    <form class="form" @submit.prevent="login">
      <div class="wrapper">
        <form-fieldset title="Factuurgegevens">
          <form-input-text
            id="username"
            v-model="username"
            title="Gebruikersnaam of e-mailadres"
            type="text"
            class="username"
            name="username"
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
        <p>{{ errors }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { v4 } from 'uuid'
import {
  useContext,
  ref,
  defineComponent,
  useRouter,
} from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable/dist'
import LoginQuery from '~/graphql/Customer/Login.gql'

export default defineComponent({
  setup() {
    const { $apolloHelpers } = useContext()
    const errors = ref([])
    const username = ref('')
    const password = ref('')
    const router = useRouter()

    const {
      mutate: login,
      loading,
      onError,
      onDone,
    } = useMutation(LoginQuery, () => ({
      variables: {
        input: {
          clientMutationId: v4(),
          username: username.value,
          password: password.value,
        },
      },
    }))

    onError(({ graphQLErrors }) => {
      errors.value = graphQLErrors.map((err) => err.message)
    })

    onDone(async ({ data }) => {
      await $apolloHelpers.onLogin(data.login.authToken)
      router.push('/winkeltje/account')
    })

    return {
      errors,
      login,
      loading,
      onError,
      onDone,
      username,
      password,
    }
  },
})
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
