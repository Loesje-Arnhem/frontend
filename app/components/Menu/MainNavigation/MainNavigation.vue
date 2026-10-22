<script lang="ts" setup>
const { data } = await useAsyncData('menu', () => $fetch('/api/menu'))

const menu = useTemplateRef('menu')
const arrowPosition: Ref<string | undefined> = ref(undefined)
const arrowWidth = ref(`0`)

const route = useRoute()
const fullPath = toRef(route, 'fullPath')
watch(fullPath, () => {
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

  const activeLink = menu.value.querySelector(
    '.router-link-active',
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
  <nav
    id="menu"
    aria-labelledby="menu"
    class="nav"
  >
    <h2 class="sr-only">
      {{ $t("mainMenu") }}
    </h2>
    <div ref="menu">
      <ul
        v-if="data?.length"
        class="menu"
      >
        <main-navigation-item
          v-for="item in data"
          :key="item.id"
          class="menu-item-page"
          :item="item"
        />
      </ul>
      <div
        v-if="arrowPosition"
        :style="{ transform: arrowPosition, width: arrowWidth }"
        class="arrow"
      />
    </div>
  </nav>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.nav {
  position: relative;
  margin-block-end: var(--spacing-m);

  @media (--show-full-navigation) {
    margin-block-end: 0;
  }
}

.menu {
  @mixin list-reset;

  padding-block-end: 5em;

  @media (--show-full-navigation) {
    display: flex;
    justify-content: space-between;
    padding-block-end: 0;
  }
}

.arrow {
  position: absolute;
  inset-block-end: 8px;
  display: none;
  block-size: 3px;
  background: var(--color-white);
  transition: all var(--animation);

  @media (--show-full-navigation) {
    display: block;
  }

  @media (--viewport-lg) {
    inset-block-end: 13px;
  }
}
</style>
