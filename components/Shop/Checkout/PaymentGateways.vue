<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core'
import { GetPaymentGatewaysQueryDocument } from '~/graphql/__generated__/graphql'

const { result } = useQuery(GetPaymentGatewaysQueryDocument)

withDefaults(
  defineProps<{
    modelValue: string
    errors?: ErrorObject[]
  }>(),
  {
    errors: () => [],
  },
)

defineEmits(['update:modelValue', 'change'])
</script>

<template>
  <form-fieldset v-if="result?.paymentGateways" :title="$t('paymentGateways')">
    <ul v-if="result.paymentGateways.edges.length" class="list">
      <li
        v-for="paymentGateway in result.paymentGateways.edges"
        :key="paymentGateway.node.id"
        class="list-item"
      >
        <input
          :id="`payment-${paymentGateway.node.id}`"
          type="radio"
          :value="paymentGateway.node.id"
          name="payment-gateways"
          class="input"
          :checked="paymentGateway.node.id == modelValue"
          @change="$emit('update:modelValue', paymentGateway.node.id)"
        />
        <div
          v-if="paymentGateway.node.icon"
          class="icon"
          v-html="paymentGateway.node.icon"
        />
        <label :for="`payment-${paymentGateway.node.id}`" class="label">
          {{ paymentGateway.node.title }}
        </label>
      </li>
    </ul>
  </form-fieldset>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;
}

.list-item {
  display: flex;
  gap: 0.5em;
  align-items: center;
  border-bottom: 1px solid #000;

  &:last-child {
    border-bottom-width: 0;
  }
}

.icon {
  & img {
    display: block;
  }
}

.input {
  transform: translateY(-0.25em);
}

.label {
  padding: 0.5em 0;
  margin: 0;
  display: block;
  flex: 1 1 auto;
}
</style>
