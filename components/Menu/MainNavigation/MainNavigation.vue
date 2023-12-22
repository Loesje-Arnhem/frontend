<script lang="ts" setup>
import { GetHeaderMenu } from '~/graphql/menu'

import type { MenuItemWithChildren } from '~/types/MenuItem'

const items = ref<MenuItemWithChildren[]>([])

const { t } = useI18n()

const { onResult } = useQuery(GetHeaderMenu)
const localePath = useLocalePath()

onResult(({ data }) => {
  if (!data.menu?.menuItems?.edges.length) {
    return []
  }

  const baseItems = [
    {
      title: t('home'),
      id: 'home',
      url: localePath({ name: 'index' }),
    },
    {
      title: t('posters'),
      id: 'posters',
      url: localePath({ name: 'posters' }),
    },
  ]

  const menuItems = data.menu.menuItems.edges.map((item) => {
    return {
      id: item.node.id,
      url: item.node.uri ?? '',
      title: item.node.label ?? '',
      children: item.node.childItems?.edges.map((subItem) => {
        return {
          id: subItem.node.id,
          url: subItem.node.uri ?? '',
          title: subItem.node.label ?? '',
        }
      }),
    }
  })

  const productCategories = data.productCategories?.edges.map((item) => {
    return {
      id: item.node.id,
      url: item.node.uri ?? '',
      title: item.node.name ?? '',
    }
  })

  const shop = {
    title: t('shop'),
    id: 'shop',
    url: localePath({ name: 'shop' }),
    children: productCategories ?? [],
  }

  items.value = [...baseItems, ...menuItems, shop]
})

const menu: Ref<HTMLAnchorElement | null> = ref(null)
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
  <nav aria-labelledby="menu" class="nav">
    <h2 id="menu" class="sr-only" tabindex="-1">
      {{ $t('mainMenu') }}
    </h2>

    <div ref="menu">
      <ul v-if="items.length" class="menu">
        <main-navigation-item
          v-for="item in items"
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
