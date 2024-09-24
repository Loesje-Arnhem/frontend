<script lang="ts" setup>
import type { ErrorObject } from "@vuelidate/core";
import type { Option } from "~/types/Option";

defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<{
    title: string;
    description?: string | null;
    id: string;
    errors?: ErrorObject[];
    options: Option[];
  }>(),
  {
    description: null,
    errors: () => [],
  },
);

const model = defineModel({ required: true });
</script>

<template>
  <form-field
    :id
    :errors="errors"
    :title="title"
    class="field"
    :description="description"
  >
    <div class="form-select">
      <select :id v-bind="$attrs" v-model="model">
        <slot />
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="option.value === modelValue"
        >
          {{ option.title }}
        </option>
      </select>
      <app-icon icon="chevron-down" class="icon" :width="24" :height="24" />
    </div>
  </form-field>
</template>

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
