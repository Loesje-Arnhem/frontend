<template>
  <form-field
    :id="id"
    :error-message="errorMessage"
    :title="title"
    class="field"
  >
    <div class="form-select">
      <select
        :id="id"
        v-bind="$attrs"
        :value="value"
        @input="$emit('input', $event.target.value)"
      >
        <slot />
      </select>
      <icon-chevron-down
        class="icon"
        aria-hidden="true"
        width="24"
        height="24"
      />
    </div>
  </form-field>
</template>

<script>
import IconChevronDown from '~/assets/icons/chevron-down.svg'
import FormField from '~/components/Forms/FormField.vue'

export default {
  components: {
    FormField,
    IconChevronDown,
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
    value: {
      type: String,
      required: true,
    },
    errorMessage: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="postcss" scoped>
.form-select {
  position: relative;
}

.icon {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  pointer-events: none;
}
</style>
