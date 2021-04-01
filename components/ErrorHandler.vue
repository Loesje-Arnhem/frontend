<template>
  <div :class="{ active: message.length }" class="alert">
    <div class="content">
      <span class="text" aria-live="polite" role="region">{{ message }}</span>

      <button v-if="message" type="button" class="dismiss" @click="dismiss">
        <app-icon icon="close" width="24" height="24" :title="$t('close')" />
      </button>
    </div>
  </div>
</template>

<script>
import EventBusUtil from '~/utils/eventBusUtil'

export default {
  data() {
    return {
      message: '',
    }
  },
  created() {
    EventBusUtil.$on('fetch-throws-error', (error) => this.handleError(error))
  },
  methods: {
    handleError(error) {
      this.message = error
    },
    dismiss() {
      this.message = ''
    },
  },
}
</script>

<style lang="postcss" scoped>
.alert {
  @mixin notch;

  &.active {
    position: fixed;
    bottom: 0;
    font-size: 1.25em;
    left: 0;
    right: 0;
    z-index: var(--z-error-handler);
    padding: 0.5em 0.25em;
    background: var(--color-white);
    border-top: 2px solid var(--color-black);
  }
}

.content {
  display: flex;
  text-align: center;
}

button {
  order: -1;
  margin: 0.25em 0.25em 0 0;
}

.text {
  flex: 1 1 auto;
  text-align: center;
}
</style>
