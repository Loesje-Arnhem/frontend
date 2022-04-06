<template>
  <center-wrapper size="md">
    <h2>Aanmelden</h2>
    <app-form
      :class="$style.form"
      :submitted="submitted"
      :loading="loading"
      @submit="submit"
    >
      <form-fieldset title="Meld je aan voor de workshop">
        <form-input-text
          id="name"
          v-model="form.name"
          :errors="v$.name.$errors"
          :title="$t('form.fields.name')"
          type="text"
          name="name"
          autocomplete="name"
          :maxlength="50"
        />
        <form-input-text
          id="email"
          v-model="form.email"
          :errors="v$.email.$errors"
          :title="$t('form.fields.email')"
          type="email"
          name="email"
          autocomplete="email"
          :maxlength="50"
        />
        <form-input-text
          id="phoneNumber"
          v-model="form.phoneNumber"
          title="Telefoonnummer"
          type="tel"
          name="phoneNumber"
          autocomplete="tel"
        />
        <form-input-text
          id="companyName"
          v-model="form.companyName"
          type="text"
          title="Bedrijfsnaam"
          name="companyName"
        />
        <form-input-text
          id="totalAttendees"
          v-model="form.totalAttendees"
          type="number"
          :errors="v$.totalAttendees.$errors"
          title="Aantal mensen"
          name="totalAttendees"
        />

        <form-input-text
          id="date"
          v-model="form.date"
          title="Streefdatum"
          type="date"
          name="date"
        />
      </form-fieldset>
      <img src="/images/workshops.png" alt="" :class="$style.image" />
    </app-form>
  </center-wrapper>
</template>

<script>
import { email, required, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { reactive, defineComponent, ref } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'
import { v4 } from 'uuid'
import RequestWorkshopQuery from '~/graphql/Workshop/RequestWorkshop.gql'

export default defineComponent({
  setup() {
    const submitted = ref(false)

    const form = reactive({
      name: '',
      email: '',
      phoneNumber: '',
      companyName: '',
      totalAttendees: null,
      date: '',
    })

    const rules = {
      name: { required },
      email: { required, email },
      phoneNumber: {},
      companyName: {},
      totalAttendees: { required, numeric },
      date: {},
    }

    const v$ = useVuelidate(rules, form)

    const submit = async () => {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) return

      requestWorkshop()
    }

    const {
      mutate: requestWorkshop,
      loading,
      onDone,
    } = useMutation(RequestWorkshopQuery, () => ({
      variables: {
        clientMutationId: v4(),
        ...form,
      },
    }))

    onDone((result) => {
      if (result.data.requestWorkshop.response === '1') {
        submitted.value = true
      }
    })

    return {
      v$,
      submit,
      loading,
      submitted,
      form,
    }
  },
})
</script>

<style module lang="postcss">
.form {
  position: relative;
  padding-bottom: 2em;

  @media (--viewport-md) {
    padding: 0 15em 2em 0;
  }
}

.image {
  display: none;

  @media (--viewport-md) {
    pointer-events: none;
    display: block;
    bottom: 3em;
    right: 3em;
    transform: scaleX(-1);
    position: absolute;
  }
}
</style>
