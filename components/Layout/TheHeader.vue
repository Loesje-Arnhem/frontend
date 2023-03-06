<template>
  <header :class="$style.header">
    <center-wrapper>
      <skip-links />
      <mobile-navigation />

      <transition
        name="slide"
        @after-enter="afterEnter"
        @after-leave="afterLeave"
      >
        <div v-show="mobileMenuIsOpen" :class="$style.background">
          <transition name="fade">
            <div
              v-show="mobileMenuIsOpen"
              ref="content"
              :class="$style.content"
            >
              <main-navigation-toggle
                :close="true"
                :class="$style.toggle"
                @toggle-menu="closeMobileMenu"
              />
              <main-navigation :class="$style['main-navigation']" />
            </div>
          </transition>
        </div>
      </transition>
    </center-wrapper>
  </header>
</template>

<script lang="ts">
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export default defineComponent({
  setup() {
    const { closeMobileMenu, mobileMenuIsOpen } = useLayout()
    const content: Ref<HTMLDivElement | null> = ref(null)

    const afterEnter = () => {
      lockBodyScoll(true)
    }
    const afterLeave = () => {
      lockBodyScoll(false)
    }
    const lockBodyScoll = (isOpen: boolean) => {
      if (!content.value) {
        return
      }
      if (isOpen) {
        disableBodyScroll(content.value)
      } else {
        enableBodyScroll(content.value)
      }
    }

    return {
      content,
      mobileMenuIsOpen,
      afterEnter,
      afterLeave,
      closeMobileMenu,
    }
  },
})
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all var(--animation) 0.2s;
}

.fade-enter,
.fade-leave-to {
  transform: translateX(-5em);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all var(--animation);
}

.slide-enter,
.slide-leave-to {
  opacity: 0.8;
  transform: translateX(-100vw);
}
</style>

<style lang="postcss" module>
@import '~/assets/css/media-queries/media-queries.css';

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
  padding: env(safe-area-inset-top) env(safe-area-inset-left) 0
    env(safe-area-inset-right);

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
