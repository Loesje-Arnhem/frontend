<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'

const { required } = useValidators()
const minDate: Ref<string | null> = ref(null)

const pending = ref(false)
const error = ref<string | null>(null)
const submitted = ref(false)
const { t } = useI18n()
const route = useRoute()

const form = ref<HTMLFormElement | null>(null)

const formData = reactive({
  schoolName: 'test',
})

const rules = {
  schoolName: { required },
}

const v$ = useVuelidate(rules, formData)

const submit = async () => {
  // console.log(new FormData(event.target))
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    error.value = t('invalidForm')
    return
  }

  pending.value = true

  try {
    const response = await $fetch(route.path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        ...formData,
        'form-name': 'Onderwijs',
      }).toString(),
    }).catch((err) => {
      error.value = t(err.data.message)
    })
    if (response === 1) {
      submitted.value = true
    }
  } finally {
    pending.value = false
  }
}
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
    <!--
  Gegevens school
- naam school
- straat en huisnummer
- postcode
- woonplaats

Gegevens aanvrager
- Naam
- Welk vak geef je?
- Telefoon nummer
- E-mailadres

Gegevens klas
- In welk leerjaar wil je de module geven?
- Voor welk niveau wil je de module inzetten?
-->
    <section aria-label="Meld je aan voor de workshop">
      <h1>Vraag de onderwijsmodule aan</h1>
      <div v-if="submitted" class="success">
        <p>Hoi {{ formData.schoolName }}</p>
        <p>
          Wat tof dat je mijn teksten zo mooi vindt, dat je graag wilt leren hoe
          ik ze maak! Ik heb je aanvraag in goede orde ontvangen en ik ga er
          eens goed naar kijken, waarschijnlijk met mijn vriendenclub. Je krijgt
          dan zo snel mogelijk een mailtje van me terug, met de vraag om meer
          informatie mocht dat nodig zijn, en anders met daarin of ik inderdaad
          op je gewenste datum kan of niet. Houd dus je mailbox in de gaten!
        </p>
      </div>
      <form
        v-else
        ref="form"
        name="Onderwijs"
        netlify
        netlify-honeypot="bot-field"
        class="form"
        :loading="pending"
        :error="error"
        button-title="Aanmelden"
        @submit.prevent="submit"
      >
        <input name="bot-field" type="hidden" />
        <form-fieldset title="School">
          <input-text-field
            id="name"
            v-model="formData.schoolName"
            name="name"
            :errors="v$.schoolName.$errors"
            title="Naam school"
          />
        </form-fieldset>
        <button type="submit">submit</button>
      </form>
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
