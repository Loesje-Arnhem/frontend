<template>
  <div :class="$style.wrapper">
    <div :class="$style.buttons">
      <nuxt-link
        :class="$style['logo-wrapper']"
        :to="localePath({ name: 'index' })"
      >
        <app-icon icon="logo" class="logo" height="50" width="87" />

        <span class="sr-only">{{ title }}</span>
      </nuxt-link>
      <main-navigation-toggle @toggle-menu="toggleMenu(true)" />
    </div>
  </div>
</template>

<script>
import { title } from '~/data/siteDetails'
import EventBusUtil from '~/utils/eventBusUtil'
import MainNavigationToggle from '~/components/Menu/MainNavigation/MainNavigationToggle.vue'

export default {
  components: {
    MainNavigationToggle,
  },
  props: {
    showMenu: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title,
      menuIsExpanded: false,
    }
  },
  mounted() {
    EventBusUtil.$on('change-page', () => this.toggleMenu(false))
  },
  methods: {
    toggleMenu(status) {
      this.menuIsExpanded = status
      this.$emit('toggle-menu', status)
    },
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  padding: var(--spacing-xs) 0;

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

  color: var(--color-white);
}

.logo {
  fill: var(--color-white);
}
</style>
