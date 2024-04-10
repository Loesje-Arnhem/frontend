<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'

const { required, email, numeric } = useValidators()

const pending = ref(false)
const error = ref<string | null>(null)
const submitted = ref(false)
const { t } = useI18n()
const route = useRoute()

const formData = reactive({
  name: '',
  course: '',
  email: '',
  phoneNumber: '',
  schoolName: '',
  city: '',
  postcode: '',
  street: '',
  houseNumber: '',
  houseNumberSuffix: '',
  year: '',
  level: '',
})

const rules = {
  name: { required },
  course: { required },
  email: { required, email },
  phoneNumber: { required },
  schoolName: { required },
  city: { required },
  postcode: { required },
  street: { required },
  houseNumber: { required, numeric },
  year: { required },
  level: { required },
}

const v$ = useVuelidate(rules, formData)

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    error.value = t('invalidForm')
    return
  }

  pending.value = true

  try {
    await $fetch(route.path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        ...formData,
        'form-name': 'Onderwijs',
      }).toString(),
    })
    submitted.value = true
  } catch (err) {
    error.value = t('formError')
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <center-wrapper size="md">
    <section aria-label-by="form-title">
      <h1 id="form-title">Vraag de onderwijsmodule aan</h1>
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
        netlify
        netlify-honeypot="bot-field"
        :loading="pending"
        :error="error"
        button-title="Aanmelden"
        @submit="submit"
      >
        <input name="bot-field" type="hidden" />

        <form-fieldset title="Aanvrager" class="fieldset-user">
          <input-text-field
            id="name"
            v-model="formData.name"
            name="name"
            :errors="v$.name.$errors"
            title="Naam"
          />
          <input-text-field
            id="course"
            v-model="formData.course"
            name="course"
            :errors="v$.course.$errors"
            title="Welk vak geef je?"
          />
          <input-text-field
            id="email"
            v-model="formData.email"
            :errors="v$.email.$errors"
            title="E-mailadres"
            type="email"
            autocomplete="email"
          />
          <input-text-field
            id="phone-number"
            v-model="formData.phoneNumber"
            :errors="v$.phoneNumber.$errors"
            title="Telefoonnummer"
            type="tel"
            autocomplete="tel"
          />
        </form-fieldset>

        <form-fieldset title="School" class="fieldset-address">
          <div class="school-name">
            <input-text-field
              id="schoolName"
              v-model="formData.schoolName"
              name="schoolName"
              :errors="v$.schoolName.$errors"
              title="Naam school"
            />
          </div>
          <div class="city">
            <input-text-field
              id="city"
              v-model="formData.city"
              title="Plaats"
              class="city"
              name="city"
              :errors="v$.city.$errors"
            />
          </div>
          <div class="postcode">
            <input-text-field
              id="postcode"
              v-model="formData.postcode"
              title="Postcode"
              class="postcode"
              name="postcode"
              :errors="v$.postcode.$errors"
            />
          </div>
          <input-text-field
            id="houseNumber"
            v-model="formData.houseNumber"
            title="Huisnummer"
            name="houseNumber"
            :errors="v$.houseNumber.$errors"
            inputmode="numeric"
          />
          <input-text-field
            id="houseNumberSuffix"
            v-model="formData.houseNumberSuffix"
            title="Toevoeging"
            class="houseNumberSuffix"
            name="houseNumberSuffix"
          />
        </form-fieldset>

        <form-fieldset title="Klas" class="fieldset-class">
          <input-text-field
            id="year"
            v-model="formData.year"
            name="year"
            :errors="v$.year.$errors"
            title="In welk leerjaar wil je de module geven?"
          />
          <input-text-field
            id="level"
            v-model="formData.level"
            name="level"
            :errors="v$.level.$errors"
            title="Voor welk niveau wil je de module inzetten?"
          />
        </form-fieldset>
      </app-form>
    </section>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.fieldset-address {
  & :deep(.fields) {
    grid-template-columns: repeat(2, 1fr);
    @media (--viewport-sm) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.fieldset-class,
.fieldset-user {
  & :deep(.fields) {
    @media (--viewport-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.school-name,
.postcode,
.street,
.city {
  grid-column: span 2;
}

.success {
  margin-bottom: 3em;
  max-width: 80ch;
}
</style>
