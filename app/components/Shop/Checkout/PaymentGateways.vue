<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core'

withDefaults(
  defineProps<{
    modelValue: string
    errors?: ErrorObject[]
  }>(),
  {
    errors: () => [],
  },
)
const emit = defineEmits(['update:modelValue'])

const { data } = await useAsyncData(`payment-gateways`, () =>
  $fetch('/api/store/payment-gateways'),
)

onMounted(() => {
  if (data.value?.length) {
    emit('update:modelValue', data.value[0].id)
  }
})
</script>

<template>
  <form-fieldset
    v-if="data?.length"
    :title="$t('paymentGateways')"
  >
    <ul class="list">
      <li
        v-for="paymentGateway in data"
        :key="paymentGateway.id"
        class="list-item"
      >
        <input
          :id="`payment-${paymentGateway.id}`"
          type="radio"
          :value="paymentGateway.id"
          name="payment-gateways"
          class="input"
          :checked="paymentGateway.id == modelValue"
          @change="$emit('update:modelValue', paymentGateway.id)"
        >
        <!-- <div
          v-if="paymentGateway.icon"
          class="icon"
          v-html="paymentGateway.icon"
        /> -->
        <label
          :for="`payment-${paymentGateway.id}`"
          class="label"
        >
          {{ paymentGateway.title }}
        </label>
      </li>
    </ul>
  </form-fieldset>
</template>

<style lang="css" scoped>
.list {
  @mixin list-reset;
}

.list-item {
  display: flex;
  gap: 0.5em;
  align-items: center;
  border-block-end: 1px solid #000;

  &:last-child {
    border-block-end-width: 0;
  }
}

.icon {
  & img {
    display: block;
  }
}

.input {
  flex: 0 0 auto;
  inline-size: 1.25em;
  aspect-ratio: 1 / 1;
  transform: translateY(-0.25em);
}

.label {
  display: block;
  flex: 1 1 auto;
  padding: 0.5em 0;
  margin: 0;
}
</style>
