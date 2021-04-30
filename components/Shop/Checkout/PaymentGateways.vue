<template>
  <form-fieldset :title="$t('paymentGateways')">
    <ul v-if="paymentGateways.length" :class="$style.list">
      <li
        v-for="paymentGateway in paymentGateways"
        :key="paymentGateway.node.id"
        :class="$style['list-item']"
      >
        <input
          :id="`payment-${paymentGateway.node.id}`"
          v-model="selectedPaymentGateway"
          type="radio"
          :value="paymentGateway.node.id"
          name="payment-gateways"
        />
        <label :for="`payment-${paymentGateway.node.id}`" :class="$style.label">
          {{ paymentGateway.node.title }}
        </label>
      </li>
    </ul>
  </form-fieldset>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import FormFieldset from '../../Forms/FormFieldset.vue'

export default {
  components: { FormFieldset },
  props: {
    paymentGateways: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const selectedPaymentGateway = ref(null)
    return {
      selectedPaymentGateway,
    }
  },
}
</script>

<style module lang="postcss">
.list {
  @mixin list-reset;
}

.list-item {
  display: flex;
  gap: 0.5em;
  border-bottom: 1px solid #000;

  &:last-child {
    border-bottom-width: 0;
  }
}

.label {
  padding: 0.5em 0;
  display: block;
  flex: 1 1 auto;
}
</style>

<i18n>
{
  "nl": {
    "paymentGateways": "Betaalmethoden"
  }
}
</i18n>
