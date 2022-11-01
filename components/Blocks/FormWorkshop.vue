<template>
  <center-wrapper size="lg">
    <section aria-label="Meld je aan voor de workshop">
      <h1>Meld je aan voor de workshop</h1>
      <app-form
        class="form"
        :submitted="submitted"
        :loading="loading"
        :error="error"
        button-title="Aanmelden"
        @submit="submit"
      >
        <form-fieldset title="Bedrijfsgegevens">
          <form-input-text
            id="name"
            v-model="formData.name"
            :errors="v$.name.$errors"
            title="Naam"
            autocomplete="name"
            @blur="v$.name.$touch"
          />
          <form-input-text
            id="company-name"
            v-model="formData.companyName"
            :errors="v$.companyName.$errors"
            title="Bedrijfsnaam of naam organisatie"
            @blur="v$.companyName.$touch"
          />
          <form-input-text
            id="email"
            v-model="formData.email"
            :errors="v$.email.$errors"
            title="E-mailadres"
            type="email"
            autocomplete="email"
            @blur="v$.email.$touch"
          />
          <form-input-text
            id="phone-number"
            v-model="formData.phoneNumber"
            :errors="v$.phoneNumber.$errors"
            title="Telefoonnummer"
            type="tel"
            autocomplete="tel"
            @blur="v$.phoneNumber.$touch"
          />

          <form-input-text
            id="address"
            v-model="formData.address"
            description="Waar jij of je bedrijf gevestigd is, dit kan afwijken van waar de workshop gegeven moet worden"
            :errors="v$.address.$errors"
            title="Straat en huisnummer"
            @blur="v$.address.$touch"
          />
          <form-input-text
            id="zipcode"
            v-model="formData.zipcode"
            :errors="v$.zipcode.$errors"
            title="Postcode"
            @blur="v$.zipcode.$touch"
          />
          <form-input-text
            id="city"
            v-model="formData.city"
            :errors="v$.city.$errors"
            title="Woonplaats"
            @blur="v$.city.$touch"
          />
        </form-fieldset>
        <form-fieldset title="De workshop">
          <div class="intro">
            Let op: wil je meerdere workshops op een dag, dan kun je ze allemaal
            in een keer aanvragen. Wil je meerdere workshops op meerdere dagen,
            vul dan dit formulier voor elke dag apart in.
          </div>
          <form-input-text
            id="date"
            v-model="formData.date"
            title="Wanneer wil je de workshop volgen?"
            :errors="v$.date.$errors"
            type="date"
            @blur="v$.date.$touch"
          />

          <form-input-text
            id="time"
            v-model="formData.time"
            type="time"
            :errors="v$.time.$errors"
            title="Hoe laat wil je beginnen?"
            @blur="v$.time.$touch"
          />

          <form-input-text
            id="total-attendees"
            v-model="formData.totalAttendees"
            type="number"
            :errors="v$.totalAttendees.$errors"
            title="Hoeveel deelnemers verwacht je?"
            @blur="v$.totalAttendees.$touch"
          />

          <form-input-text
            id="location"
            v-model="formData.location"
            :errors="v$.location.$errors"
            title="Waar wil je de workshop volgen?"
            description="Volledig adres van de workshoplocatie"
            @blur="v$.location.$touch"
          />
          <form-input-text
            id="total-workshops"
            v-model="formData.totalWorkshops"
            :errors="v$.totalWorkshops.$errors"
            title="Hoeveel workshops wil je aanvragen?"
            @blur="v$.totalWorkshops.$touch"
          />

          <form-input-text
            id="theme"
            v-model="formData.theme"
            :errors="v$.theme.$errors"
            title="Wil je over een bepaald thema schrijven?"
            @blur="v$.theme.$touch"
          />
          <form-textarea
            id="motivation"
            v-model="formData.motivation"
            rows="5"
            class="motivation"
            description="Motiveer je aanvraag: Waarom wil je graag een Loesje-workshop aanvragen? (Optioneel)"
            :errors="v$.motivation.$errors"
            title="Motiveer je aanvraag"
          />
        </form-fieldset>
        <app-image
          class="image"
          src="/images/workshops.png"
          :width="495"
          :height="280"
          sizes="md:495px"
        />
      </app-form>
    </section>
  </center-wrapper>
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import {
  reactive,
  defineComponent,
  ref,
  computed,
} from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'
import { v4 } from 'uuid'
import AppImage from '../Shared/AppImage.vue'
import RequestWorkshopQuery from '~/graphql/Workshop/RequestWorkshop'
import useValidators from '~/composables/useValidators'

export default defineComponent({
  components: { AppImage },
  setup() {
    const submitted = ref(false)
    const { required, numeric, email } = useValidators()

    const formData = reactive({
      name: '',
      companyName: '',
      address: '',
      zipcode: '',
      city: '',
      phoneNumber: '',
      email: '',
      motivation: '',
      date: '',
      time: '',
      totalAttendees: null,
      location: '',
      totalWorkshops: '',
      theme: '',
    })

    const rules = {
      name: { required },
      companyName: { required },
      address: { required },
      zipcode: { required },
      city: { required },
      phoneNumber: { required },
      email: { required, email },
      motivation: {},
      date: { required },
      time: { required },
      totalAttendees: { required, numeric },
      location: { required },
      totalWorkshops: { required },
      theme: {},
    }

    const v$ = useVuelidate(rules, formData)

    const error = computed(() => {
      if (apiError.value) {
        return apiError.value.message
      } else if (v$.value.$dirty && v$.value.$invalid) {
        return 'validations.form'
      }
      return null
    })

    const submit = async () => {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) {
        return
      }

      requestWorkshop()
    }

    const {
      mutate: requestWorkshop,
      loading,
      onDone,
      error: apiError,
    } = useMutation(RequestWorkshopQuery, () => ({
      variables: {
        clientMutationId: v4(),
        ...formData,
      },
    }))

    onDone((result) => {
      if (result.data.requestWorkshop.response === '1') {
        submitted.value = true
      }
    })

    return {
      error,
      v$,
      submit,
      loading,
      submitted,
      formData,
    }
  },
})
</script>

<style scoped lang="postcss">
.form {
  position: relative;
  padding-bottom: 2em;

  @media (--viewport-lg) {
    padding: 0 15em 2em 0;
  }

  @media (--viewport-sm) {
    & >>> .fields {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.intro,
.motivation {
  @media (--viewport-sm) {
    grid-column: span 2;
  }
}

.image >>> img {
  display: none;

  @media (--viewport-lg) {
    pointer-events: none;
    display: block;
    bottom: 3em;
    right: 3em;
    transform: scaleX(-1);
    position: absolute;
  }
}
</style>
