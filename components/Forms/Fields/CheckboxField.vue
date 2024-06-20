<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  title: string
  id: string
}>()
const model = defineModel({ required: true })
</script>

<template>
  <div class="field">
    <input
      v-bind="$attrs"
      :id
      v-model="model"
      :checked="modelValue"
      type="checkbox"
      class="input"
      :true-value="true"
      :false-value="false"
    >
    <label :for="id">{{ title }}</label>
  </div>
</template>

<style lang="postcss" scoped>
.field {
  display: flex;
  gap: 0.25em;
  align-items: flex-start;
  margin-bottom: 0.5em;
}

.input {
  flex: 0 0 auto;
  width: 1.25em;
  aspect-ratio: 1 / 1;
  translate: 0 0.25em;
}
</style>
