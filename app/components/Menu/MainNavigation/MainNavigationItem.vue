<script lang="ts" setup>
import type { MenuItemWithChildren } from '~/types/MenuItem'

const props = defineProps<{
  item: MenuItemWithChildren
}>()

const { openMenus, add, remove } = useLayout()
const menuIsOpen = useMenu()
let timer = null as number | null
const link = ref<ComponentPublicInstance<HTMLAnchorElement> | null>(null)

const isOpen = computed(() => openMenus.value.includes(props.item.title))

const toggleMenu = () => {
  if (isOpen.value) {
    remove(props.item.title)
  }
  else {
    add(props.item.title)
  }
}

const setActiveSubmenu = () => {
  if (!isSmallScreen()) return
  if (!link.value) return
  if (!link.value.$el.classList.contains('nuxt-link-active')) {
    return
  }
  add(props.item.title)
}

watch(menuIsOpen, () => {
  if (menuIsOpen.value) {
    setActiveSubmenu()
  }
})

const hasChildren = computed(() => {
  return props.item.children?.length ? true : false
})

const mouseover = () => {
  if (isSmallScreen()) return
  if (!hasChildren.value) return
  if (!timer) return
  add(props.item.title)
  clearTimeout(timer)
}

const mouseout = () => {
  if (isSmallScreen()) return
  timer = window.setTimeout(() => {
    remove(props.item.title)
  }, 150)
}
const isSmallScreen = () => {
  return window.innerWidth < 768
}

const id = useId()
</script>

<template>
  <li
    :class="{ 'has-popup': hasChildren }"
    class="menu-item"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <main-navigation-link
      ref="link"
      :item="item"
      :aria-haspopup="hasChildren"
      class="menu-link"
    />
    <button
      v-if="hasChildren"
      :aria-controls="id"
      :aria-expanded="isOpen"
      class="btn-show-submenu"
      @click="toggleMenu"
    >
      <app-icon
        icon="chevron-down"
        :width="16"
        :height="16"
        class="icon"
      />
      <span class="sr-only">
        {{
          $t("showSubmenuFor", {
            title: item.title,
          })
        }}
      </span>
    </button>

    <slide-in-animation>
      <ul
        v-if="isOpen"
        :id="id"
        class="submenu tile"
      >
        <li
          v-for="subItem in item.children"
          :key="subItem.url"
          class="submenu-item"
        >
          <main-navigation-link
            :item="subItem"
            class="submenu-link"
          />
        </li>
      </ul>
    </slide-in-animation>
  </li>
</template>

<style scoped>
@import "~/assets/css/media-queries/media-queries.css";

.menu-item {
  position: relative;
  flex: 0 0 auto;

  @media (--show-full-navigation) {
    align-items: center;
    flex-wrap:;
    display: flex;
  }
}

/* stylelint-disable */
.submenu-link,
.menu-link {
  @mixin link-reset;

  transition: border var(--animation);
  border-bottom-style: solid;
  border-bottom-color: currentColor;
  display: block;
  line-height: var(--line-height-headings);
  padding: var(--spacing-xs) 0;
}

.menu-link {
  @mixin heading;

  margin-top: 0.1em;
  border-bottom-width: 2px;
  font-size: var(--font-size-xl);

  .menu-item:first-child & {
    border-top: 2px solid currentColor;

    @media (--show-full-navigation) {
      border-top: 0;
    }
  }

  @media (--show-full-navigation) {
    color: var(--color-white);
    border-bottom-width: 0;
    font-size: var(--font-size-m);
  }

  @media (--viewport-lg) {
    font-size: var(--font-size-xl);
  }
}

.submenu-link {
  border-bottom-width: 1px;

  @media (--show-full-navigation) {
    border-bottom: 0;
    color: var(--color-black);
    padding: var(--spacing-xxs) var(--spacing-xs);
  }

  .submenu-item:last-child & {
    border-bottom-width: 0;
  }

  &.router-link-exact-active :deep(.title) {
    box-shadow: 0 2px 0 0 currentColor;
  }
}

.btn-show-submenu {
  display: block;
  padding: 0.5em;
  position: absolute;
  right: 0;
  top: 0.25em;

  @media (--show-full-navigation) {
    color: var(--color-white);
    padding: 0.25em;
    position: static;
  }
}

.icon {
  transition: transform var(--animation);
  [aria-expanded="true"] & {
    transform: rotate(-180deg);

    @media (--show-full-navigation) {
      transform: rotate(0deg);
    }
  }
}

.submenu {
  @mixin list-reset;

  padding-left: var(--spacing-m);
  border-bottom: 2px solid currentColor;

  @media (--show-full-navigation) {
    @mixin list-reset;

    min-width: 10em;
    color: var(--color-black);
    background: var(--color-white);
    border-top: 0;
    position: absolute;
    top: 100%;
    margin: 0;
    left: calc(-1 * var(--spacing-xs));
    padding: var(--spacing-xxs) 0;
    white-space: nowrap;

    &::before {
      position: absolute;
      content: "";
      height: 0;
      width: 0;
      left: var(--spacing-m);
      top: calc(-1 * var(--spacing-xs));
      border-left: 0.5em solid transparent;
      border-right: 0.5em solid transparent;
      border-bottom: 0.5em solid var(--color-white);
    }

    .menu-item:last-child & {
      left: auto;
      right: calc(-1 * var(--spacing-xs));
      &::before {
        left: auto;
        right: var(--spacing-m);
      }
    }
  }
}
</style>
