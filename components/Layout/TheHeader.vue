<template>
  <header :class="$style.header">
    <center-wrapper>
      <skip-links />
      <mobile-navigation @toggleMenu="toggleMenu" />

      <transition
        name="slide"
        @after-enter="afterEnter"
        @after-leave="afterLeave"
      >
        <div v-show="showMenu" :class="$style.background">
          <transition name="fade">
            <div v-show="showMenu" ref="content" :class="$style.content">
              <main-navigation
                :class="$style['main-navigation']"
                :menu-is-open="showMenu"
              />
            </div>
          </transition>
        </div>
      </transition>
    </center-wrapper>
  </header>
</template>

<script>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import SkipLinks from '~/components/Menu/SkipLinks.vue'
import MobileNavigation from '~/components/Menu/MobileNavigation.vue'
import MainNavigation from '~/components/Menu/MainNavigation/MainNavigation.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    SkipLinks,
    MobileNavigation,
    MainNavigation,
    CenterWrapper,
  },
  data() {
    return {
      showMenu: false,
    }
  },
  methods: {
    toggleMenu(status) {
      this.showMenu = status
    },
    afterEnter() {
      this.lockBodyScoll(true)
    },
    afterLeave() {
      this.lockBodyScoll(false)
    },
    lockBodyScoll(isOpen) {
      const { content } = this.$refs
      if (isOpen) {
        disableBodyScroll(content)
      } else {
        enableBodyScroll(content)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s 0.2s;
}

.fade-enter,
.fade-leave-to {
  transform: translateY(-2em);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-100vh);
}
</style>

<style lang="postcss" module>
.header {
  @media (--show-full-navigation) {
    @mixin color-negative;
  }
}

.background {
  position: fixed;
  background: var(--color-white);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  overflow: hidden;
  z-index: var(--z-main-navigation);
  padding: var(--notch-top) var(--notch-right) 0 var(--notch-left);

  @media (--show-full-navigation) {
    background: transparent;
    height: auto;
    position: static;
    padding: 0;
    overflow: visible;
    display: block !important;
  }
}

.content {
  padding: 5em var(--gutter) var(--gutter);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  max-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (--show-full-navigation) {
    padding: 0;
    overflow: visible;
    transform: none;
    display: grid !important;
    grid-template-columns: auto 1fr;
    grid-column-gap: var(--gutter);
    max-height: none;
    align-items: end;
    flex: 0 0 auto;
    width: 100%;
  }
}

.logo-wrapper {
  @mixin link-reset;

  display: none;

  @media (--show-full-navigation) {
    display: block;
    margin-top: var(--spacing-xs);
    width: 5em;
  }

  @media (--navigation-lg) {
    grid-row: span 2;
    margin-bottom: var(--spacing-s);
    width: 7em;
  }
}

.meta-navigation {
  align-self: start;
  justify-self: end;
}

.main-navigation {
  order: -1;

  @media (--show-full-navigation) {
    grid-column: span 2;
    order: 1;
    align-self: end;
  }

  @media (--navigation-lg) {
    grid-column: span 1;
  }
}

.logo {
  width: 100%;
  height: auto;
  display: block;
}
</style>
