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

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType,
  Ref,
} from '@nuxtjs/composition-api'
// import { ErrorObject } from '@vuelidate/core'

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

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
    errors: {
      type: Array as PropType<ErrorObject[]>,
      default: () => [],
    },
  },
  setup(props) {
    const errorMessage = computed(() =>
      props.errors.map((error) => error.$message).join(', '),
    )
    return {
      errorMessage,
    }
  },
})
</script>

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
