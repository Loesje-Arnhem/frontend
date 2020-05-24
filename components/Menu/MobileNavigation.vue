<template>
  <div :class="$style.wrapper">
    <center-wrapper :top="true">
      <div :class="$style.buttons">
        <nuxt-link :class="$style['logo-wrapper']" to="/">
          <icon-logo class="logo" height="50" width="87" aria-hidden="true" />

          <span class="sr-only">{{ title }}</span>
        </nuxt-link>
        <button
          :aria-expanded="menuIsExpanded ? 'true' : 'false'"
          :class="$style.btn"
          @click="toggleMenu(!menuIsExpanded)"
        >
          <icon-bars
            aria-hidden="true"
            width="24"
            height="24"
            :class="$style.bars"
          />
          {{ $t('title') }}
        </button>
      </div>
    </center-wrapper>
  </div>
</template>

<script>
import IconBars from '~/assets/icons/bars.svg'
import IconLogo from '~/assets/icons/logo.svg'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import { title } from '~/data/siteDetails'
import EventBusUtil from '~/utils/eventBusUtil'

export default {
  components: {
    IconBars,
    CenterWrapper,
    IconLogo,
  },
  props: {
    showMenu: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuIsExpanded: false,
      title,
    }
  },
  mounted() {
    EventBusUtil.$on('change-page', () => this.toggleMenu(false))
  },
  methods: {
    toggleMenu(status) {
      this.menuIsExpanded = status
      this.$emit('toggleMenu', status)
    },
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  @mixin color-negative;

  position: fixed;
  padding: var(--spacing-xs) 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-mobile-navigation);
  border-bottom: 1px solid var(--color-white);

  @media (--show-full-navigation) {
    display: none;
  }
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-wrapper {
  @mixin link-reset;

  display: flex;
  align-items: center;
}

.logo {
  fill: var(--color-white);
}

.btn {
  @mixin btn;

  color: var(--color-white);
  font-size: var(--font-size-xs);
  border-color: currentColor;
  display: flex;
  align-items: center;

  &[aria-expanded='true'] {
    background: var(--color-white);
    color: var(--color-black);
  }
}

.bars {
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
