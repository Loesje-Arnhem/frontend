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
          type="radio"
          :value="paymentGateway.node.id"
          name="payment-gateways"
          :class="$style.input"
          :checked="paymentGateway.node.id == value"
          @change="$emit('input', paymentGateway.node.id)"
        />
        <div
          v-if="paymentGateway.node.icon"
          :class="$style.icon"
          v-html="paymentGateway.node.icon"
        />
        <label :for="`payment-${paymentGateway.node.id}`" :class="$style.label">
          {{ paymentGateway.node.title }}
        </label>
      </li>
    </ul>
  </form-fieldset>
</template>

<script>
export default {
  props: {
    paymentGateways: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
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

<i18n>
{
  "nl": {
    "paymentGateways": "Betaalmethoden"
  }
}
</i18n>
