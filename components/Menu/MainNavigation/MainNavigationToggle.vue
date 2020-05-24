<template>
  <button
    :aria-expanded="showMenu ? 'true' : 'false'"
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
    {{ title }}
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
    showMenu: {
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
        return 'Sluiten'
      }
      return 'Menu'
    },
  },
}
</script>

<style lang="postcss" module>
.btn {
  @mixin btn;

  font-size: var(--font-size-xs);
  border-color: currentColor;
  display: flex;
  align-items: center;

  &:hover,
  &:focus {
    background: var(--color-white);
    color: var(--color-black);
  }

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
    "title": "Menu"
  }
}
</i18n>
