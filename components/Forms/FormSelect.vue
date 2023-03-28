<template>
  <form-field
    :id="id"
    :errors="errors"
    :title="title"
    class="field"
  >
    <div class="form-select">
      <select
        :id="id"
        v-bind="$attrs"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @change="$emit('change')"
      >
        <slot />
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.title }}
        </option>
      </select>
      <app-icon
        icon="chevron-down"
        class="icon"
        :width="24"
        :height="24"
      />
    </div>
  </form-field>
</template>

<script lang="ts">
import { IOption } from '~/interfaces/IOption'
export default defineComponent({
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
      type: String || Number,
      default: '',
    },
    errors: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array as PropType<IOption[]>,
      default: () => [],
    },
  },
  emits: ['change', 'input'],
})
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
