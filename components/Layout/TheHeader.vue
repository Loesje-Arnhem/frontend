<template>
  <header :class="$style.header">
    <center-wrapper>
      <skip-links />
      <mobile-navigation :expanded="showMenu" @toggle-menu="toggleMenu" />

      <transition
        name="slide"
        @after-enter="afterEnter"
        @after-leave="afterLeave"
      >
        <div v-show="showMenu" :class="$style.background">
          <transition name="fade">
            <div v-show="showMenu" ref="content" :class="$style.content">
              <main-navigation-toggle
                :close="true"
                :class="$style.toggle"
                :expanded="showMenu"
                @toggle-menu="toggleMenu(false)"
              />
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
import MainNavigationToggle from '~/components/Menu/MainNavigation/MainNavigationToggle.vue'
import MobileNavigation from '~/components/Menu/MobileNavigation.vue'
import MainNavigation from '~/components/Menu/MainNavigation/MainNavigation.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    SkipLinks,
    MobileNavigation,
    MainNavigation,
    CenterWrapper,
    MainNavigationToggle,
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
  transform: translateX(-2em);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100vw);
}
</style>

<style lang="postcss" module>
.header {
  @mixin color-negative;

  border-bottom: 1px solid var(--color-white);
}

.background {
  position: fixed;
  background: var(--color-black);
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
  padding: var(--gutter) var(--gutter) 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  max-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (--show-full-navigation) {
    padding: 0;
    overflow: visible;
    transform: none;
    display: block !important;
    max-height: none;
    width: 100%;
  }
}

.toggle {
  flex: 0 0 auto;
  margin-bottom: 1em;
  align-self: flex-end;

  @media (--show-full-navigation) {
    display: none;
  }
}
</style>
