<template>
  <div class="wrapper">
    <p v-if="submitted">
      {{ $t('form.forms.contact.success') }}
    </p>

    <app-form
      v-else
      @submit.prevent="submitForm"
      class="form"
      name="workshop"
      button-title="Verzenden"
    >
      <form-fieldset title="Contact">
        <form-input-text
          id="email"
          v-model="form.email"
          :error-message="errorMessageEmail"
          title="E-mailadres"
          type="email"
          name="email"
        />
        <form-input-text
          id="name"
          v-model="form.name"
          :error-message="errorMessageName"
          title="Naam"
          name="name"
        />
        <form-input-text
          id="phoneNumber"
          v-model="form.phoneNumber"
          title="Telefoonnummer"
          type="tel"
          name="phoneNumber"
        />
        <form-input-text
          id="companyName"
          v-model="form.companyName"
          title="Bedrijfsnaam"
          name="companyName"
        />
        <form-input-text
          id="totalAttendees"
          v-model="form.totalAttendees"
          title="Aantal mensen"
          type="number"
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
    </app-form>
  </div>
</template>

<script>
import axios from 'axios'
import { required, email } from 'vuelidate/lib/validators'

import FormFieldset from '~/components/Forms/FormFieldset.vue'
import FormInputText from '~/components/Forms/FormInputText.vue'
import AppForm from '~/components/Forms/AppForm.vue'

export default {
  components: {
    FormFieldset,
    FormInputText,
    AppForm
  },
  data() {
    return {
      submitted: false,

      form: {
        email: 'michil@test.com',
        name: '12312',
        phoneNumber: '',
        companyName: '',
        totalAttendees: '',
        date: ''
      }
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  computed: {
    errorMessageName() {
      if (this.$v.form.name.$anyError) {
        if (!this.$v.form.name.required) {
          return this.$t('form.errors.general.required', {
            field: this.$t('form.fields.name').toLowerCase()
          })
        }
      }
      return null
    },
    errorMessageEmail() {
      if (this.$v.form.email.$anyError) {
        if (!this.$v.form.email.required) {
          return this.$t('form.errors.general.required', {
            field: this.$t('form.fields.email').toLowerCase()
          })
        }

        if (!this.$v.form.email.email) {
          return this.$t('form.errors.fields.email.invalidEmail')
        }
      }
      return null
    }
  },
  methods: {
    encodeFormData(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    validate() {
      this.$v.$touch()
      return !this.$v.$invalid
    },
    async submitForm() {
      if (this.validate()) {
        await axios.post('/', this.encodeFormData(this.form), {
          header: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        this.submitted = true
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.form {
  @mixin block;
  & >>> .fields {
    grid-template-columns: repeat(4, 1fr);
  }
}

.wrapper {
  @mixin center;
}
</style>
