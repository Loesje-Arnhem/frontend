<template>
  <div>
    <form class="form" method="post" @submit.prevent="login">
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
import { useContext, ref, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $auth } = useContext()
    const loading = ref(false)
    const errors = ref(null)
    const username = ref('')
    const password = ref('')
    // const router = useRouter()

    const login = async () => {
      loading.value = true
      try {
        await $auth.loginWith('graphql', {
          input: {
            clientMutationId: v4(),
            username: username.value,
            password: password.value,
          },
        })
      } catch (err) {
        console.log(err)
        errors.value = err
      } finally {
        loading.value = false
      }
    }

    // onError(({ graphQLErrors }) => {
    //   errors.value = graphQLErrors.map((err) => err.message)
    // })

    // onDone(async ({ data }) => {
    //   await $apolloHelpers.onLogin(data.login.authToken)
    //   router.push(app.localePath({ name: 'shop-account' }))
    // })

    return {
      loading,
      errors,
      login,
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
