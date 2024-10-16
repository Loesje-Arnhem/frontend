<script lang="ts" setup>
import type { ErrorObject } from "@vuelidate/core";

defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<{
    title: string;
    description?: string | null;
    name: string;
    id: string;
    errors?: ErrorObject[];
  }>(),
  {
    description: null,
    errors: () => [],
  },
);

defineEmits(["keyup-down", "keyup-up", "change", "blur"]);

const model = defineModel<string>({ required: true });
</script>

<template>
  <form-field
    :id
    :errors="errors"
    :title="title"
    class="field"
    :description="description"
  >
    <textarea
      :id
      v-bind="$attrs"
      v-model="model"
      :name
      @keyup.down="$emit('keyup-down')"
      @keyup.up="$emit('keyup-up')"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur')"
    />
  </form-field>
</template>
