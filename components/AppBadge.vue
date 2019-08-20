<template>
  <span v-if="amount > 0" class="badge">{{ amount }}</span>
</template>

<script>
export default {
  props: {
    amount: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.badge {
  font-size: 0.7em;
  background: var(--text-color);
  min-width: 1.25em;
  height: 1.25em;
  transform: translate3d(0.25em, 0, 0);
  flex: 0 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: var(--color-secondary);
  padding: 0 0.3em;
}
</style>
