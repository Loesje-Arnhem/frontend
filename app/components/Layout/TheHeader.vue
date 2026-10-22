<script lang="ts" setup>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

const { closeMobileMenu } = useMenu()

const menuIsOpen = useMenuState()

const content = useTemplateRef('content')

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
  }
  else {
    enableBodyScroll(content.value)
  }
}
</script>

<template>
  <header class="header">
    <center-wrapper>
      <skip-links />
      <mobile-navigation />

      <transition
        name="slide"
        @after-enter="afterEnter"
        @after-leave="afterLeave"
      >
        <div
          v-show="menuIsOpen"
          class="background"
        >
          <transition name="fade">
            <div
              v-show="menuIsOpen"
              ref="content"
              class="content"
            >
              <main-navigation-toggle
                :close="true"
                class="toggle"
                @toggle-menu="closeMobileMenu"
              />
              <main-navigation class="main-navigation" />
            </div>
          </transition>
        </div>
      </transition>
    </center-wrapper>
  </header>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.fade-enter-active,
.fade-leave-active {
  transition: all var(--animation) 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-5em);
}

.slide-enter-active,
.slide-leave-active {
  transition: all var(--animation);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0.8;
  transform: translateX(-100vw);
}

.header {
  @mixin color-negative;

  border-block-end: 1px solid var(--color-white);
}

.background {
  position: fixed;
  inset: 0;
  z-index: var(--z-main-navigation);
  block-size: 100vh;
  padding:
    env(safe-area-inset-top) env(safe-area-inset-left) 0
    env(safe-area-inset-right);
  overflow: hidden;
  background: var(--color-black);

  @media (--show-full-navigation) {
    position: static;
    display: block !important;
    block-size: auto;
    padding: 0;
    overflow: visible;
    background: transparent;
  }
}

.content {
  display: flex;
  flex-direction: column;
  max-block-size: 100vh;
  padding: var(--gutter) var(--gutter) 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  @media (--show-full-navigation) {
    display: block !important;
    inline-size: 100%;
    max-block-size: none;
    padding: 0;
    overflow: visible;
    transform: none;
  }
}

.toggle {
  flex: 0 0 auto;
  align-self: flex-end;
  margin-block-end: 1em;

  @media (--show-full-navigation) {
    display: none;
  }
}
</style>
