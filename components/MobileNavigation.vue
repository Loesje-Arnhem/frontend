<template>
  <div class="wrapper">
    <center-wrapper :top="true">
      <div class="buttons">
        <nuxt-link class="logo-wrapper" to="/">
          <icon-logo class="logo" height="50" width="87" aria-hidden="true" />
          <span class="sr-only">Loesje</span>
        </nuxt-link>
        <button
          :aria-expanded="menuIsExpanded"
          class="btn"
          @click="toggleMenu(!menuIsExpanded)"
        >
          <icon-bars aria-hidden="true" width="24" height="24" class="bars" />
          {{ $t('menu') }}
        </button>
      </div>
    </center-wrapper>
  </div>
</template>

<script>
import IconBars from '~/assets/icons/bars.svg'
import IconLogo from '~/assets/icons/logo.svg'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    IconBars,
    IconLogo,
    CenterWrapper,
  },
  data() {
    return {
      menuIsExpanded: false,
    }
  },

  watch: {
    $route() {
      this.toggleMenu(false)
    },
  },

  methods: {
    toggleMenu(status) {
      this.menuIsExpanded = status
      this.$emit('toggleMenu', status)
    },
  },
}
</script>

<style lang="postcss" scoped>
.wrapper {
  position: fixed;
  padding: var(--spacing-xs) 0;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-black);
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
  display: flex;
  align-items: center;
}

.btn {
  padding: 0.5em 0.75em 0.5em 0.5em;
  color: var(--color-white);
  display: flex;
  align-items: center;
  border: 2px solid var(--color-white);
  width: auto;

  &[aria-expanded='true'] {
    background: var(--color-white);
    color: var(--color-black);
  }
}

.bars {
  margin-right: var(--spacing-xxs);
}

.logo {
  fill: var(--color-white);
}
</style>
