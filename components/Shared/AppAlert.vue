<template>
  <div v-if="show && text" :class="type" class="alert">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
    type: {
      type: String,
      default: 'warning',
    },
  },
  data() {
    return {
      show: true,
    }
  },
  computed: {
    icon() {
      if (this.type === 'success') {
        return 'check'
      }
      return 'warning'
    },
  },
  methods: {
    close() {
      this.show = false
    },
  },
}
</script>

<style scoped lang="postcss">
.alert {
  display: flex;
  margin-bottom: 1em;
  color: var(--color-white);
  padding: 0.5em 1em;
  line-height: 1.2;
}

.icon-alert {
  top: 0.1em;
  flex: 0 0 auto;
  margin-right: 0.5em;
}

.warning {
  background: var(--color-black);
}

.success {
  background: var(--color-black);
}
</style>
