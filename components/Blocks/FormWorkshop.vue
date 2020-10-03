<template>
  <div class="wrapper">
    <p v-if="submitted">
      {{ $t('form.forms.contact.success') }}
    </p>

    <app-form
      v-else
      class="form"
      name="workshop"
      button-title="Verzenden"
      @submit.prevent="submitForm"
    >
      <form-fieldset title="Contact">
        <form-input-text
          id="email"
          v-model="$v.emailAddress.$model"
          :errors="$v.emailAddress.$errors"
          title="E-mailadres"
          type="email"
          name="email"
        />
        <form-input-text
          id="name"
          v-model="$v.name.$model"
          :errors="$v.name.$errors"
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
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { ref } from '@vue/composition-api'
import FormFieldset from '~/components/Forms/FormFieldset.vue'
import FormInputText from '~/components/Forms/FormInputText.vue'
import AppForm from '~/components/Forms/AppForm.vue'

export default {
  components: {
    FormFieldset,
    FormInputText,
    AppForm,
  },
  setup() {
    const name = ref('')
    const emailAddress = ref('')
    const rules = {
      name: { required },
      emailAddress: { required, email },
    }

    const $v = useVuelidate(rules, { name, emailAddress })
    return { name, email, $v }
  },
  data() {
    return {
      submitted: false,

      form: {
        phoneNumber: '',
        companyName: '',
        totalAttendees: '',
        date: '',
      },
    }
  },

  methods: {
    encodeFormData(data) {
      return Object.keys(data)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`,
        )
        .join('&')
    },
    validate() {
      this.$v.$touch()
      return !this.$v.$invalid
    },
    async submitForm() {
      if (this.validate()) {
        try {
          await this.$axios.$post('/', this.encodeFormData(this.form), {
            header: { 'Content-Type': 'application/x-www-form-urlencoded' },
          })
          this.submitted = true
        } catch (error) {}
      }
    },
  },
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
