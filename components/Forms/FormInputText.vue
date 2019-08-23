<template>
  <form-field
    :id="id"
    :error-message="errorMessage"
    :title="title"
    class="field"
  >
    <input
      :id="id"
      v-bind="$attrs"
      :value="value"
      :maxlength="maxlength"
      @input="$emit('input', $event.target.value)"
    />
  </form-field>
</template>

<script>
import FormField from '~/components/Forms/Formfield.vue'
export default {
  components: {
    FormField
  },
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    maxlength: {
      type: Number,
      default: 50
    },
    errorMessage: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
