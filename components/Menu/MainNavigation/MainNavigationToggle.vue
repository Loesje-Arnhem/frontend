<template>
  <button
    :aria-expanded="mobileMenuIsOpen ? 'true' : 'false'"
    :class="$style.btn"
    @click="$emit('toggle-menu')"
  >
    <app-icon :icon="icon" width="24" height="24" :class="$style.icon" />
    <span :class="$style.title">{{ title }}</span>
  </button>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useLayout from '~/composables/useLayout'
export default defineComponent({
  props: {
    close: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { mobileMenuIsOpen } = useLayout()
    return {
      mobileMenuIsOpen,
    }
  },
  computed: {
    icon() {
      if (this.close) {
        return 'close'
      }
      return 'bars'
    },
    title() {
      if (this.close) {
        return this.$t('close')
      }
      return this.$t('menu')
    },
  },
})
</script>

<style lang="postcss" module>
.title {
  transition: box-shadow 0.2s ease-out;
}

.btn {
  @mixin btn;
  @mixin hover-with-title;

  font-size: var(--font-size-xs);
  border-color: var(--color-white);
  display: flex;
  align-items: center;

  @media (--show-full-navigation) {
    display: none;
  }
}

.icon {
  margin-right: var(--spacing-xxs);
  fill: currentcolor;
}
</style>

<!-- <i18n>
{
  "nl": {
    "menu": "Menu",
    "close": "Sluiten"
  }
}
<i18n> -->
