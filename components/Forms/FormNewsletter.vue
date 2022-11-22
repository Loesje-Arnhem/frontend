<template>
  <div v-if="submitted" class="success">
    <p>
      Wat tof dat je mijn teksten zo mooi vindt, dat je graag wilt leren hoe ik
      ze maak! Ik heb je aanvraag in goede orde ontvangen en ik ga er eens goed
      naar kijken, waarschijnlijk met mijn vriendenclub. Je krijgt dan zo snel
      mogelijk een mailtje van me terug, met de vraag om meer informatie mocht
      dat nodig zijn, en anders met daarin of ik inderdaad op je gewenste datum
      kan of niet. Houd dus je mailbox in de gaten!
    </p>
  </div>
  <app-form
    v-else
    class="form"
    :loading="loading"
    :error="error"
    button-title="Aanmelden"
    @submit="submit"
  >
    <form-fieldset title="Nieuwsbrief">
      <form-input-text
        id="email"
        v-model="formData.email"
        :errors="v$.email.$errors"
        title="Meld je aan voor de nieuwbrief"
        type="email"
        autocomplete="email"
        @blur="v$.email.$touch"
      />
    </form-fieldset>
  </app-form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import useNewsletter from '~/composables/useNewsletter'
export default defineComponent({
  setup() {
    const { submit, formData, loading, error, submitted, v$ } = useNewsletter()

    return {
      submit,
      formData,
      loading,
      error,
      submitted,
      v$,
    }
  },
})
</script>
