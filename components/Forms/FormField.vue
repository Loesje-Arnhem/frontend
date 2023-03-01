<script lang="ts" setup>
interface ErrorObject {
  readonly $propertyPath: string
  readonly $property: string
  readonly $validator: string
  readonly $message: string | Ref<string>
  readonly $params: object
  readonly $pending: boolean
  readonly $response: any
  readonly $uid: string
}

const props = defineProps<{
  title: string
  description?: string
  id: string
  errors: ErrorObject[]
}>()

const errorMessage = computed(() =>
  props.errors.map((error) => error.$message).join(', '),
)
</script>

<template>
  <div class="field">
    <label :for="id" class="label">{{ title }}</label>
    <slot />
    <form-error-message :error="errorMessage" />
    <div class="description" v-if="description">
      {{ description }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.label {
  display: block;
  margin-bottom: 0.25em;
  font-weight: var(--font-weight-bold);
}

.description {
  margin-bottom: 0.5em;
}
</style>
