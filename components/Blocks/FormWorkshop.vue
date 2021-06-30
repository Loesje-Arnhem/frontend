<template>
  <div>
    <app-form
      name="workshop"
      :submitted="submitted"
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
        <form-input-text
          id="totalAttendees"
          v-model="$v.totalAttendees.$model"
          title="Aantal mensen"
          type="number"
          name="totalAttendees"
        />
        <form-input-text
          id="date"
          v-model="$v.date.$model"
          title="Streefdatum"
          type="date"
          name="date"
        />
      </form-fieldset>
    </app-form>
  </div>
</template>

<script lang="ts">
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { reactive, toRef, defineComponent } from '@nuxtjs/composition-api'
import useForm from '~/compositions/form'

export default defineComponent({
  setup() {
    const form = reactive({
      name: 'michiel',
      email: '',
      phoneNumber: '',
      companyName: '',
      totalAttendees: '',
      date: '',
    })

    const rules = {
      name: { required },
      email: { required, email },
      phoneNumber: {},
      companyName: {},
      totalAttendees: {},
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

    const { submit, submitted } = useForm($v, form, rules)

    return { $v, submit, submitted }
  },
})
</script>
