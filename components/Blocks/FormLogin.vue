<template>
  <div class="wrapper">
    <app-form
      class="form"
      button-title="inloggen"
      :loading="loading"
      :error="error"
      @submit="submit"
    >
      <form-fieldset title="Inloggen">
        <form-input-text
          id="username"
          v-model="form.username"
          title="Gebruikersnaam of e-mailadres"
          name="username"
          :errors="v$.username.$errors"
          autocomplete="username"
        />
        <form-input-text
          id="password"
          v-model="form.password"
          title="Wachtwoord"
          type="password"
          name="password"
          :errors="v$.password.$errors"
          autocomplete="current-password"
        />
      </form-fieldset>
    </app-form>
  </div>
</template>

<script>
import { v4 } from 'uuid'
import {
  useContext,
  ref,
  defineComponent,
  reactive,
} from '@nuxtjs/composition-api'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default defineComponent({
  setup() {
    const { $auth } = useContext()
    const loading = ref(false)
    const error = ref(null)
    const form = reactive({
      username: '',
      password: '',
    })

    const rules = {
      username: { required },
      password: { required },
    }

    const v$ = useVuelidate(rules, form)

    const submit = async () => {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) return

      loading.value = true
      try {
        await $auth.loginWith('graphql', {
          input: {
            clientMutationId: v4(),
            ...form,
          },
        })
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    return {
      v$,
      loading,
      error,
      submit,
      form,
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
