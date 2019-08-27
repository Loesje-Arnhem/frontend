<template>
  <form class="form">
    <div class="wrapper">
      <form-fieldset title="Contact">
        <form-input-text
          id="email"
          v-model="email"
          title="test"
          type="text"
          name="email"
        />
        <form-input-text
          id="name"
          v-model="name"
          title="test"
          type="text"
          name="name"
        />
        <form-input-text
          id="email"
          v-model="email"
          title="test"
          type="text"
          name="email"
        />
        <form-input-text
          id="name"
          v-model="name"
          title="test"
          type="text"
          name="name"
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
      name: ''
    }
  }
}
</script>

<style lang="postcss" scoped>
.form {
  @mixin block;
}

.wrapper {
  @mixin center;
}
</style>
