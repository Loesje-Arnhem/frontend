<template>
  <header>
    <skip-links />
    <mobile-navigation @toggleMenu="toggleMenu" />

    <transition
      name="fade2"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <div v-show="showMenu" class="bg">
        <transition name="fade">
          <div v-show="showMenu" ref="bg" class="content">
            <main-navigation />
          </div>
        </transition>
      </div>
    </transition>
  </header>
</template>

<script>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import SkipLinks from '~/components/SkipLinks.vue'
import MainNavigation from '~/components/Menu/MainNavigation.vue'
import MobileNavigation from '~/components/MobileNavigation.vue'

export default {
  components: {
    SkipLinks,
    MainNavigation,
    MobileNavigation,
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
    beforeLeave() {
      const bg = this.$refs.bg
      bg.scrollTop = 0
    },
    afterLeave() {
      this.lockBodyScoll(false)
    },
    lockBodyScoll(isOpen) {
      const { bg } = this.$refs
      if (isOpen) {
        disableBodyScroll(bg)
      } else {
        enableBodyScroll(bg)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
header {
  background: var(--color-primary);

  @media (--show-full-navigation) {
    background: transparent;
  }
}

.header-wrapper {
  display: flex;

  @mixin center;
}

.content {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  max-height: 100vh;

  @media (--show-full-navigation) {
    flex-direction: column;
    overflow: visible;
    transform: translateY(0);
    display: flex !important;
    max-height: none;
    justify-content: flex-end;
    flex: 1 0 auto;
  }
}

.usps {
  order: -1;
}

.logo-wrapper {
  @mixin link-reset;

  align-self: center;
  flex: 0 0 auto;
  margin-bottom: -2em;
  position: relative;
  z-index: 9;
}

.bg {
  flex: 1 1 auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: var(--z-index-main-navigation);
  padding: 5em env(safe-area-inset-right) 0 env(safe-area-inset-left);
  background: var(--color-black);

  @media (--show-full-navigation) {
    height: auto;
    position: static;
    padding: 0;
    overflow: visible;
    display: flex !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s 0.2s;
}

.fade-enter,
.fade-leave-to {
  transform: translateY(-2em);
  opacity: 0;
}

.fade2-enter-active,
.fade2-leave-active {
  transition: transform 0.3s;
}

.fade2-enter,
.fade2-leave-to {
  transform: translateY(-100vh);
}

.logo {
  fill: var(--color-primary);
  display: none;

  @media (--show-full-navigation) {
    display: block;
  }
}

.triangle {
  display: none;

  @media (--viewport-lg) {
    display: block;
    position: absolute;
    left: 0;
    top: 20em;
    width: 10vw;
    height: auto;
  }
}

.header-bow {
  flex: 1 0 auto;
  fill: var(--color-primary);
  display: none;
  width: 15vw;
  max-width: 13em;

  @media (--show-full-navigation) {
    display: block;
  }
}
</style>
