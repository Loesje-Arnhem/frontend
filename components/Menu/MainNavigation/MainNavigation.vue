<script lang="ts" setup>
import { Ref } from 'vue'
import pages from '~/data/menu'

const localePath = useLocalePath()

const menu: Ref<HTMLAnchorElement | null> = ref(null)
const arrowPosition: Ref<string | undefined> = ref(undefined)
const arrowWidth = ref(`0`)

const route = useRoute()
watch(route, () => {
  nextTick(() => {
    setArrowPosition()
  })
})

const updateArrowAfterResize = () => {
  setArrowPosition()
}

const getMainLink = () => {
  if (!menu.value) {
    return null
  }
  let activeLink = menu.value.querySelector(
    '.router-link-exact-active',
  ) as HTMLAnchorElement | null
  if (!activeLink) {
    return null
  }

  const parent = activeLink.closest('.menu-item-page') as HTMLLIElement | null
  if (!parent) {
    return null
  }
  return parent
}

onMounted(() => {
  setArrowPosition()
  window.addEventListener('resize', updateArrowAfterResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateArrowAfterResize)
})

const setArrowPosition = () => {
  if (!menu.value) {
    return
  }
  const activeLink = getMainLink()
  if (!activeLink) {
    arrowWidth.value = '0'
    return
  }
  const title = activeLink.querySelector('.title') as HTMLSpanElement | null
  if (!title) {
    arrowWidth.value = '0'
    return
  }
  arrowPosition.value = `translateX(${activeLink.offsetLeft}px)`
  arrowWidth.value = `${title.offsetWidth}px`
}
</script>

<template>
  <nav aria-labelledby="menu" class="nav">
    <h2 id="menu" class="sr-only" tabindex="-1">
      {{ $t('mainMenu') }}
    </h2>
    <div ref="menu">
      <ul v-if="pages" class="menu">
        <main-navigation-item
          class="menu-item-page"
          :title="$t('home')"
          :uri="localePath({ name: 'index' })"
        />
        <main-navigation-item
          class="menu-item-page"
          :title="$t('posters')"
          :uri="localePath({ name: 'posters' })"
        />
        <main-navigation-item
          class="menu-item-page"
          :title="pages.aboutPage.title"
          :uri="pages.aboutPage.uri"
          :children="pages.aboutPageChildren"
        />
        <main-navigation-item
          class="menu-item-page"
          :title="pages.joinPage.title"
          :uri="pages.joinPage.uri"
          :children="pages.joinPageChildren"
        />
        <main-navigation-item
          class="menu-item-page"
          :title="$t('workshops')"
          :uri="localePath({ name: 'workshops' })"
        />

        <main-navigation-item
          v-if="pages.productCategories.edges.length"
          class="menu-item-page"
          :title="$t('shop')"
          :uri="localePath({ name: 'shop' })"
          :children="pages.productCategories"
        />
      </ul>
      <div
        :style="{ transform: arrowPosition, width: arrowWidth }"
        class="arrow"
        v-if="arrowPosition"
      />
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.nav {
  position: relative;
  margin-bottom: var(--spacing-m);

  @media (--show-full-navigation) {
    margin-bottom: 0;
  }
}

.menu {
  @mixin list-reset;

  padding-bottom: 5em;

  @media (--show-full-navigation) {
    display: flex;
    padding-bottom: 0;
    justify-content: space-between;
  }
}

.arrow {
  height: 3px;
  background: var(--color-white);
  display: none;
  position: absolute;
  bottom: 13px;
  transition: all var(--animation);

  @media (--show-full-navigation) {
    display: block;
  }
}
</style>
