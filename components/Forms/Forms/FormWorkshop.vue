<script lang="ts" setup>
import { Endpoints } from '~/enums/endpoints'

const { required, numeric, email, minValue, maxValue } = useValidators()
const minDate: Ref<string | null> = ref(null)

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
  totalAttendees: 4,
  location: '',
  totalWorkshops: 1,
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
  totalAttendees: {
    required,
    numeric,
    minValue: minValue(4),
    maxValue: maxValue(16),
  },
  location: { required },
  totalWorkshops: { required, numeric },
  theme: {},
}

const { v$, loading, error, submit, submitted } = useForm(
  rules,
  formData,
  Endpoints.FormWorkshop,
)

onMounted(() => {
  if (!process.client) {
    return
  }
  const date = new Date()
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const month =
    date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  minDate.value = `${date.getFullYear()}-${month}-${day}`
})
</script>

<template>
  <center-wrapper size="lg">
    <section aria-label="Meld je aan voor de workshop">
      <h1>Meld je aan voor de workshop</h1>
      <div v-if="submitted" class="success">
        <p>Hoi {{ formData.name }}</p>
        <p>
          Wat tof dat je mijn teksten zo mooi vindt, dat je graag wilt leren hoe
          ik ze maak! Ik heb je aanvraag in goede orde ontvangen en ik ga er
          eens goed naar kijken, waarschijnlijk met mijn vriendenclub. Je krijgt
          dan zo snel mogelijk een mailtje van me terug, met de vraag om meer
          informatie mocht dat nodig zijn, en anders met daarin of ik inderdaad
          op je gewenste datum kan of niet. Houd dus je mailbox in de gaten!
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
        <form-fieldset title="Bedrijfsgegevens">
          <input-text-field
            id="name"
            v-model="formData.name"
            :errors="v$.name.$errors"
            title="Naam"
            autocomplete="name"
            @blur="v$.name.$touch"
          />
          <input-text-field
            id="company-name"
            v-model="formData.companyName"
            :errors="v$.companyName.$errors"
            title="Bedrijfsnaam of naam organisatie"
            @blur="v$.companyName.$touch"
          />
          <input-text-field
            id="email"
            v-model="formData.email"
            :errors="v$.email.$errors"
            title="E-mailadres"
            type="email"
            autocomplete="email"
            @blur="v$.email.$touch"
          />
          <input-text-field
            id="phone-number"
            v-model="formData.phoneNumber"
            :errors="v$.phoneNumber.$errors"
            title="Telefoonnummer"
            type="tel"
            autocomplete="tel"
            @blur="v$.phoneNumber.$touch"
          />

          <input-text-field
            id="address"
            v-model="formData.address"
            description="Waar jij of je bedrijf gevestigd is, dit kan afwijken van waar de workshop gegeven moet worden"
            :errors="v$.address.$errors"
            title="Straat en huisnummer"
            @blur="v$.address.$touch"
          />
          <input-text-field
            id="zipcode"
            v-model="formData.zipcode"
            :errors="v$.zipcode.$errors"
            title="Postcode"
            @blur="v$.zipcode.$touch"
          />
          <input-text-field
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
          <input-text-field
            id="date"
            v-model="formData.date"
            title="Wanneer wil je de workshop volgen?"
            :errors="v$.date.$errors"
            :min="minDate"
            type="date"
            @blur="v$.date.$touch"
          />
          <input-text-field
            id="time"
            v-model="formData.time"
            type="time"
            :errors="v$.time.$errors"
            title="Hoe laat wil je beginnen?"
            @blur="v$.time.$touch"
          />

          <input-text-field
            id="total-attendees"
            v-model.number="formData.totalAttendees"
            type="number"
            min="1"
            :errors="v$.totalAttendees.$errors"
            title="Hoeveel deelnemers verwacht je?"
            @blur="v$.totalAttendees.$touch"
          />

          <input-text-field
            id="location"
            v-model="formData.location"
            :errors="v$.location.$errors"
            title="Waar wil je de workshop volgen?"
            description="Volledig adres van de workshoplocatie"
            @blur="v$.location.$touch"
          />
          <input-text-field
            id="total-workshops"
            v-model.number="formData.totalWorkshops"
            type="number"
            min="1"
            :errors="v$.totalWorkshops.$errors"
            title="Hoeveel workshops wil je aanvragen?"
            @blur="v$.totalWorkshops.$touch"
          />

          <input-text-field
            id="theme"
            v-model="formData.theme"
            :errors="v$.theme.$errors"
            title="Wil je over een bepaald thema schrijven?"
            @blur="v$.theme.$touch"
          />
          <div class="motivation">
            <textarea-field
              id="motivation"
              v-model="formData.motivation"
              rows="5"
              description="Motiveer je aanvraag: Waarom wil je graag een Loesje-workshop aanvragen? (Optioneel)"
              :errors="v$.motivation.$errors"
              title="Motiveer je aanvraag"
            />
          </div>
        </form-fieldset>
        <app-image
          class="image"
          src="/images/workshops.png"
          :width="495"
          :height="280"
        />
      </app-form>
    </section>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.form {
  position: relative;
  padding-bottom: 2em;

  @media (--viewport-lg) {
    padding: 0 15em 2em 0;
  }

  @media (--viewport-sm) {
    & :deep(.fields) {
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

.image {
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

.success {
  margin-bottom: 3em;
  max-width: 80ch;
}
</style>
