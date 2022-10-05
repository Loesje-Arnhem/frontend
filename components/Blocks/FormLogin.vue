<template>
  <center-wrapper>
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
  </center-wrapper>
</template>

<script lang="ts">
import { v4 } from 'uuid'
import {
  useContext,
  ref,
  defineComponent,
  reactive,
  computed,
} from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import useValidators from '~/composables/useValidators'

export default defineComponent({
  setup() {
    const { $auth } = useContext()
    const { required } = useValidators()
    const loading = ref(false)
    const apiError = ref(null as string | null)
    const form = reactive({
      username: '',
      password: '',
    })

    const rules = {
      username: { required },
      password: { required },
    }

    const v$ = useVuelidate(rules, form)

    const error = computed(() => {
      if (apiError.value) {
        return apiError.value
      } else if (v$.value.$dirty && v$.value.$invalid) {
        return 'validations.form'
      }
      return null
    })

    const submit = async () => {
      const isFormCorrect = await v$.value.$validate()
      apiError.value = null
      if (!isFormCorrect) return

      loading.value = true
      try {
        await $auth.loginWith('graphql', {
          input: {
            clientMutationId: v4(),
            ...form,
          },
        })
      } catch (err: any) {
        apiError.value = 'validations.submit'
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

  & :deep(.fields) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
