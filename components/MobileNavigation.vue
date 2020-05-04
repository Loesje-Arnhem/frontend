<template>
  <div class="wrapper">
    <div class="buttons">
      <button
        :aria-expanded="menuIsExpanded"
        class="btn"
        @click="toggleMenu(!menuIsExpanded)"
      >
        <icon-bars aria-hidden="true" width="24" height="24" class="bars" />
        {{ $t('menu') }}
      </button>
      <nuxt-link class="logo-wrapper" to="/">
        <icon-logo class="logo" height="50" width="87" aria-hidden="true" />
        <span class="sr-only">Loesje</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import IconBars from '@/assets/icons/bars.svg'
import IconLogo from '@/assets/icons/logo.svg'

export default {
  components: {
    IconBars,
    IconLogo,
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
  position: sticky;
  padding: 0.5em var(--gutter);
  top: 0;
  background: var(--color-black);
  z-index: var(--z-index-mobile-navigation);
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
  display: flex;
  align-items: center;
  border: 2px solid var(--color-white);
  width: auto;
}

.bars {
  margin-right: 0.25em;
  fill: var(--color-white);
}

.logo {
  fill: var(--color-white);
}
</style>
