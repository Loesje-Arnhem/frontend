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
        <form-field id="name" :errors="[]" :title="$t('form.fields.name')">
          <input
            id="name"
            v-model.lazy="form.name"
            type="text"
            name="name"
            autocomplete="name"
            maxlength="50"
          />
        </form-field>
        <form-field id="email" :errors="[]" :title="$t('form.fields.email')">
          <input
            id="email"
            v-model.lazy="form.email"
            type="email"
            name="email"
            autocomplete="email"
            maxlength="50"
          />
        </form-field>
        <form-field id="phoneNumber" title="Streefdatum">
          <input
            id="phoneNumber"
            v-model="form.phoneNumber"
            title="Telefoonnummer"
            type="tel"
            name="phoneNumber"
            autocomplete="tel"
          />
        </form-field>
        <form-field id="companyName" title="Streefdatum">
          <input
            id="companyName"
            v-model="form.companyName"
            type="text"
            title="Bedrijfsnaam"
            name="companyName"
          />
        </form-field>
        <form-field id="totalAttendees" :errors="[]" title="Aantal mensen">
          <input
            id="totalAttendees"
            v-model.lazy="form.totalAttendees"
            type="number"
            name="totalAttendees"
          />
        </form-field>

        <form-field id="date" title="Streefdatum">
          <input id="date" v-model="form.date" type="date" name="date" />
        </form-field>
      </form-fieldset>
      <img src="/images/workshops.png" alt="" :class="$style.image" />
    </app-form>
  </center-wrapper>
</template>

<script>
// import { email, required, numeric } from '@vuelidate/validators'
// import { useVuelidate } from '@vuelidate/core'
import { reactive, defineComponent, ref } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable/dist'
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

    // const rules = {
    //   name: { required },
    //   email: { required, email },
    //   phoneNumber: {},
    //   companyName: {},
    //   totalAttendees: { required, numeric },
    //   date: {},
    // }

    // const $v = useVuelidate(rules, {
    //   email: form.email,
    //   name: form.name,
    //   phoneNumber: form.phoneNumber,
    //   companyName: form.companyName,
    //   totalAttendees: form.totalAttendees,
    //   date: form.date,
    // })

    const submit = () => {
      // $v.value.$touch()
      // if ($v.value.$invalid) return
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
      // $v,
      form,
      submit,
      loading,
      submitted,
    }
  },
})
</script>

<style module lang="postcss">
.form {
  position: relative;

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
