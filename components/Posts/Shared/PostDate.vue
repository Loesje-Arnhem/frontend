<template>
  <app-date :date="date" :class="$style.date" />
</template>

<script>
import AppDate from '~/components/Shared/AppDate.vue'

export default {
  components: {
    AppDate,
  },
  props: {
    date: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="postcss" module>
.date {
  font-size: 0.9em;
  color: var(--color-gray);
  display: block;
  order: -1;
}
</style>
