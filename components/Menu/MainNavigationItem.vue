<template>
  <li
    class="menu-item"
    :class="{ open: isOpen, 'has-popup': item.childItems.edges.length > 0 }"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <menu-item
      :item="item"
      class="menu-link"
      :aria-haspopup="item.childItems.edges.length > 0"
      :aria-expanded="isOpen"
    />
    <button
      v-if="item.childItems.edges.length"
      class="btn-show-submenu"
      :aria-expanded="isOpen"
      @click="toggleMenu"
    >
      <icon-chevron-down
        aria-hidden="true"
        width="16"
        height="16"
        class="icon"
      />
      <span class="sr-only">Toon submenu voor {{ item.label }}</span>
    </button>
    <ul v-if="item.childItems.edges.length" ref="submenu" class="submenu">
      <li
        v-for="subItem in item.childItems.edges"
        :key="subItem.node.label"
        class="submenu-item"
      >
        <menu-item :item="subItem.node" class="submenu-link" />
      </li>
    </ul>
  </li>
</template>

<script>
import MenuItem from '@/components/Menu/MenuItem.vue'
import IconChevronDown from '@/assets/icons/chevron-down.svg'

export default {
  components: {
    MenuItem,
    IconChevronDown
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      timer: null
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    mouseover() {
      this.isOpen = true
      clearTimeout(this.timer)
    },
    mouseout() {
      this.timer = setTimeout(() => {
        this.isOpen = false
      }, 250)
    }
  }
}
</script>

<style lang="postcss" scoped>
.submenu {
  @mixin list-reset;
  margin-left: 1em;

  &::before {
    position: absolute;
    content: '';
    height: 0;
    width: 0;
    left: 1em;
    top: -0.5em;
    border-left: 0.5em solid transparent;
    border-right: 0.5em solid transparent;
    border-bottom: 0.5em solid var(--color-white);
  }

  @media (--show-full-navigation) {
    color: var(--color-black);
    background: var(--color-white);
    border: 1px solid var(--color-black);
    border-top: 0;
    display: none;
    position: absolute;
    top: 100%;
    margin-left: 0;
    left: -0.5em;
    padding: 0.25em 0.5em;
    white-space: nowrap;

    @nest .open & {
      display: block;
    }
  }
}

.menu-item {
  position: relative;
  @media (--show-full-navigation) {
    display: flex;
    padding: 0.75em 0;
  }
}

.submenu-link,
.menu-link {
  @mixin link-reset;
  line-height: 1.1;
}

.menu-link {
  @mixin heading;
  font-size: 1.25em;
  align-items: center;
  display: flex;
  position: relative;

  &:hover {
    box-shadow: 0 2px 0 0 currentColor;
  }

  &[aria-haspopup='true'] {
    padding-right: 0.25em;
  }
}

.submenu-link {
  border-bottom: 2px solid transparent;

  &:hover,
  &.nuxt-link-exact-active {
    box-shadow: 0 2px 0 0 currentColor;
  }

  @media (--show-full-navigation) {
    margin: 0.25em 0;
  }
}

.btn-show-submenu {
  display: none;
  @media (--show-full-navigation) {
    display: block;
  }
}
</style>
