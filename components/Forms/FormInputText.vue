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
import FormField from '~/components/Forms/FormField.vue'
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

<style lang="postcss" scoped>
input {
  --rough-stroke: black;
  --rough-stroke-width: 2px;
  --rough-roughness: 1.5;
  border: var(--rough-stroke-width) solid var(--rough-stroke);
}

.is-loaded input {
  @supports (border-image-source: paint(rough-boxes)) {
    border-image-source: paint(rough-boxes);
    border-image-slice: 0 fill;
    border-image-outset: 10px;
    background: none;
  }
}
</style>
