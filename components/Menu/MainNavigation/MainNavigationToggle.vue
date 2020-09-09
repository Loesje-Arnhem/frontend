<template>
  <button
    :aria-expanded="expanded ? 'true' : 'false'"
    :class="$style.btn"
    @click="$emit('toggleMenu')"
  >
    <component
      :is="icon"
      aria-hidden="true"
      width="24"
      height="24"
      :class="$style.icon"
    />
    <span :class="$style.title">
      {{ title }}
    </span>
  </button>
</template>

<script>
import IconClose from '~/assets/icons/close.svg'
import IconBars from '~/assets/icons/bars.svg'

export default {
  components: {
    IconClose,
    IconBars,
  },
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    icon() {
      if (this.close) {
        return 'icon-close'
      }
      return 'icon-bars'
    },
    title() {
      if (this.close) {
        return this.$t('close')
      }
      return this.$t('menu')
    },
  },
}
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
  fill: currentColor;
}
</style>

<i18n>
{
  "nl": {
    "menu": "Menu",
    "close": "Sluiten"
  }
}
</i18n>
