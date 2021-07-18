<template>
  <center-wrapper size="md">
    <app-form
      name="workshop"
      :submitted="submitted"
      :loading="loading"
      @submit="submit"
    >
      <form-fieldset title="Meld je aan voor de workshop">
        <form-field
          id="name"
          :errors="$v.name.$errors"
          :title="$t('form.fields.name')"
        >
          <input
            id="name"
            v-model.lazy="$v.name.$model"
            type="text"
            name="name"
            autocomplete="name"
            maxlength="50"
          />
        </form-field>
        <form-field
          id="email"
          :errors="$v.email.$errors"
          :title="$t('form.fields.email')"
        >
          <input
            id="email"
            v-model.lazy="$v.email.$model"
            type="email"
            name="email"
            autocomplete="email"
            maxlength="50"
          />
        </form-field>
        <form-input-text
          id="phoneNumber"
          v-model="$v.phoneNumber.$model"
          title="Telefoonnummer"
          type="tel"
          name="phoneNumber"
          autocomplete="tel"
        />
        <form-input-text
          id="companyName"
          v-model="$v.companyName.$model"
          title="Bedrijfsnaam"
          name="companyName"
        />
        <form-field
          id="totalAttendees"
          :errors="$v.totalAttendees.$errors"
          title="Aantal mensen"
        >
          <input
            id="totalAttendees"
            v-model.number.lazy="$v.totalAttendees.$model"
            type="number"
            name="totalAttendees"
          />
        </form-field>

        <form-input-text
          id="date"
          v-model="$v.date.$model"
          title="Streefdatum"
          type="date"
          name="date"
        />
      </form-fieldset>
    </app-form>
  </center-wrapper>
</template>

<script>
import { email, required, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { reactive, toRef, defineComponent, ref } from '@nuxtjs/composition-api'
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

    const rules = {
      name: { required },
      email: { required, email },
      phoneNumber: {},
      companyName: {},
      totalAttendees: { required, numeric },
      date: {},
    }

    const $v = useVuelidate(rules, {
      email: toRef(form, 'email'),
      name: toRef(form, 'name'),
      phoneNumber: toRef(form, 'phoneNumber'),
      companyName: toRef(form, 'companyName'),
      totalAttendees: toRef(form, 'totalAttendees'),
      date: toRef(form, 'date'),
    })

    const submit = () => {
      $v.value.$touch()
      if ($v.value.$invalid) return
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

    return { $v, submit, loading, submitted }
  },
})
</script>
