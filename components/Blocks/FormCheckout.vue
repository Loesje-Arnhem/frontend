<template>
  <form class="form">
    <div class="wrapper">
      <form-fieldset title="Factuurgegevens">
        <form-input-text
          id="firstName"
          v-model="firstName"
          title="Voornaam"
          type="text"
          class="firstName"
          name="firstName"
        />
        <form-input-text
          id="lastName"
          v-model="lastName"
          title="Achternaam"
          type="text"
          class="lastName"
          name="lastName"
        />
        <form-input-text
          id="companyName"
          v-model="companyName"
          class="companyName"
          title="Bedrijfsnaam"
          type="text"
          name="companyName"
        />
        <form-input-text
          id="country"
          v-model="country"
          title="Land"
          type="text"
          class="country"
          name="country"
        />
        <form-input-text
          id="zipcode"
          v-model="zipcode"
          title="Postcode"
          type="text"
          class="zipcode"
          name="zipcode"
        />
        <form-input-text
          id="houseNumber"
          v-model="houseNumber"
          title="Nr"
          type="number"
          class="houseNumber"
          name="houseNumber"
        />
        <form-input-text
          id="houseNumberAddition"
          v-model="houseNumberAddition"
          title="Toev"
          type="text"
          class="houseNumberAddition"
          name="houseNumberAddition"
        />
        <form-input-text
          id="street"
          v-model="street"
          title="Straat"
          type="text"
          class="street"
          name="street"
        />
        <form-input-text
          id="city"
          v-model="city"
          title="Plaats"
          type="text"
          class="city"
          name="city"
        />
        <form-input-text
          id="email"
          v-model="email"
          title="E-mailadres"
          type="email"
          class="email"
          name="email"
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
      firstName: '',
      lastName: '',
      companyName: '',
      country: '',
      zipcode: '',
      houseNumber: '',
      houseNumberAddition: '',
      street: '',
      city: '',
      email: ''
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
