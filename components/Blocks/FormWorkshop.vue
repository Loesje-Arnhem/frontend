<template>
  <div :class="$style.wrapper">
    <app-form
      :class="$style.form"
      name="workshop"
      :submitted="submitted"
      @submit="submit"
    >
      <form-fieldset title="Contact">
        <form-input-text
          id="email"
          v-model="$v.email.$model"
          :errors="$v.email.$errors"
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
          v-model="$v.phoneNumber.$model"
          title="Telefoonnummer"
          type="tel"
          name="phoneNumber"
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

<script>
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { reactive, toRef, ref } from '@vue/composition-api'
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
    const submitted = ref(false)
    const form = reactive({
      name: '',
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

    // handle the submit of the form, only called
    // if the form is valid
    const submit = () => {
      $v.value.$touch()

      if ($v.value.$invalid) return
      submitted.value = true

      alert('Form Submitted ' + JSON.stringify(form, null, 2))
    }

    return { $v, submit, submitted }
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

<style lang="postcss" module>
.form {
  @mixin block;

  & :global(.fields) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.wrapper {
  @mixin center;
}
</style>
