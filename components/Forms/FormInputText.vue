<template>
  <form-field :id="id" :errors="errors" :title="title" class="field">
    <input
      :id="id"
      v-bind="$attrs"
      :value="value"
      :type="type"
      class="input"
      :maxlength="maxlength"
      @keyup.down="$emit('keyup-down')"
      @keyup.up="$emit('keyup-up')"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
    />
  </form-field>
</template>

<script>
import FormField from '~/components/Forms/FormField.vue'
export default {
  components: {
    FormField,
  },
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      required: true,
    },
    maxlength: {
      type: Number,
      default: 50,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
