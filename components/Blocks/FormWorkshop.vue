<template>
  <form class="form">
    <div class="wrapper">
      <form-fieldset title="Contact">
        <form-input-text
          id="email"
          v-model="email"
          title="E-mailadres"
          type="email"
          name="email"
        />
        <form-input-text id="name" v-model="name" title="Naam" name="name" />
        <form-input-text
          id="phoneNumber"
          v-model="phone"
          title="Telefoonnummer"
          type="tel"
          name="phoneNumber"
        />
        <form-input-text
          id="companyName"
          v-model="companyName"
          title="Bedrijfsnaam"
          name="companyName"
        />
        <form-input-text
          id="totalAttendees"
          v-model="totalAttendees"
          title="Aantal mensen"
          name="totalAttendees"
        />
        <form-input-text
          id="date"
          v-model="date"
          title="Streefdatum"
          type="date"
          name="date"
        />
      </form-fieldset>
    </div>
  </form>
</template>

<script>
import FormFieldset from '~/components/Forms/FormFieldset.vue'
import FormInputText from '~/components/Forms/FormInputText.vue'

export default {
  components: {
    FormFieldset,
    FormInputText
  },
  data() {
    return {
      email: '',
      name: '',
      phoneNumber: '',
      companyName: '',
      totalAttendees: '',
      date: ''
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

.wrapper {
  @mixin center;
}

.firstName,
.lastName,
.zipcode,
.street,
.city {
  grid-column: span 2;
}

.email,
.country,
.companyName {
  grid-column: span 4;
}
</style>
