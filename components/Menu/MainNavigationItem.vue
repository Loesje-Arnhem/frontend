<template>
  <li
    :class="[$style['menu-item'], { 'has-popup': hasChildren }]"
    class="menu-item"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <!-- eslint-disable vue/no-v-html -->
    <nuxt-link
      ref="link"
      :to="url"
      :aria-haspopup="hasChildren"
      :class="$style['menu-link']"
      class="menu-link"
      @click.native="changePage"
      v-html="title"
    />
    <!-- eslint-enable vue/no-v-html -->

    <button
      v-if="hasChildren"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :class="$style['btn-show-submenu']"
      @click="toggleMenu"
    >
      <icon-chevron-down
        aria-hidden="true"
        width="16"
        height="16"
        :class="$style['icon']"
      />
      <span class="sr-only">
        {{
          $t('showSubmenuFor', {
            title: title,
          })
        }}
      </span>
    </button>
    <template v-if="hasChildren">
      <animation-slide-in>
        <ul v-show="isOpen" :class="$style.submenu">
          <li
            v-for="subItem in children.edges"
            :key="subItem.node.id"
            :class="$style['menu-item']"
            class="menu-item"
          >
            <!-- eslint-disable vue/no-v-html -->
            <nuxt-link
              :to="subItem.node.uri"
              :class="$style['submenu-link']"
              class="submenu-link"
              @click.native="changePage"
              v-html="subItem.node.title"
            />
            <!-- eslint-enable vue/no-v-html -->
          </li>
        </ul>
      </animation-slide-in>
    </template>
  </li>
</template>

<script>
import IconChevronDown from '~/assets/icons/chevron-down.svg'
import AnimationSlideIn from '~/components/Animations/SlideInAnimation.vue'
import EventBusUtil from '~/utils/eventBusUtil'

export default {
  components: {
    IconChevronDown,
    AnimationSlideIn,
  },
  props: {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    children: {
      type: Object,
      default: () => {},
    },
    resetSubmenu: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      timer: null,
    }
  },
  computed: {
    hasChildren() {
      return this.children?.edges?.length > 0
    },
  },
  watch: {
    resetSubmenu(value) {
      if (value) {
        this.setActiveSubmenu()
      }
    },
  },
  mounted() {
    EventBusUtil.$on('change-page', () => (this.isOpen = false))
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },

    setActiveSubmenu() {
      if (!this.isSmallScreen) return
      const { link } = this.$refs
      this.isOpen = link.$el.classList.contains('nuxt-link-active')
    },
    mouseover() {
      if (this.isSmallScreen()) return
      this.isOpen = true
      clearTimeout(this.timer)
    },
    mouseout() {
      if (this.isSmallScreen()) return
      this.timer = setTimeout(() => {
        this.isOpen = false
      }, 250)
    },
    changePage() {
      EventBusUtil.$emit('change-page')
    },
    isSmallScreen() {
      return window.innerWidth < 768
    },
  },
}
</script>

<style lang="postcss" module>
.submenu {
  @mixin list-reset;

  margin: 0 0 0.5em 1em;

  @media (--show-full-navigation) {
    color: var(--color-black);
    background: var(--color-white);
    border: 1px solid var(--color-black);
    border-top: 0;
    position: absolute;
    top: 100%;
    margin: 0;
    left: -0.5em;
    padding: 0.25em 0.5em;
    white-space: nowrap;

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

  &:last-child .submenu {
    right: 0;
    left: auto;

    &::before {
      left: auto;
      right: 1em;
    }
  }
}

.submenu-link,
.menu-link {
  @mixin link-reset;

  line-height: 1.1;
  padding: 0.25em 0;

  @media (--show-full-navigation) {
    padding: 0;
  }
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

.sr-only {
  @mixin sr-only;
}

.submenu-link {
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
