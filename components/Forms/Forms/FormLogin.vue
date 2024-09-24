<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";

const { required } = useValidators();
const loading = ref(false);
const apiError = ref(null as string | null);
const formData = reactive({
  username: "",
  password: "",
});

const rules = {
  username: { required },
  password: { required },
};

const v$ = useVuelidate(rules, formData);

const error = computed(() => {
  if (apiError.value) {
    return apiError.value;
  } else if (v$.value.$dirty && v$.value.$invalid) {
    return "validations.form";
  }
  return null;
});

const submit = async () => {
  const isFormCorrect = await v$.value.$validate();
  apiError.value = null;
  if (!isFormCorrect) return;

  // loading.value = true
  // try {
  //   await $auth.loginWith('graphql', {
  //     input: formData,
  //   })
  // } catch (err: any) {
  //   apiError.value = 'validations.submit'
  // } finally {
  //   loading.value = false
  // }
};
</script>

<template>
  <app-form
    class="form"
    button-title="inloggen"
    :loading="loading"
    :error="error"
    @submit="submit"
  >
    <form-fieldset title="Inloggen">
      <input-text-field
        id="username"
        v-model="formData.username"
        title="Gebruikersnaam of e-mailadres"
        name="username"
        :errors="v$.username.$errors"
        autocomplete="username"
      />
      <input-text-field
        id="password"
        v-model="formData.password"
        title="Wachtwoord"
        type="password"
        name="password"
        :errors="v$.password.$errors"
        autocomplete="current-password"
      />
    </form-fieldset>
  </app-form>
</template>

<style lang="postcss" scoped>
.form {
  @mixin block;
}
</style>
