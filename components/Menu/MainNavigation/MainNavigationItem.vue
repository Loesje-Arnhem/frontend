<template>
  <li
    :class="[$style['menu-item'], { 'has-popup': hasChildren }]"
    class="menu-item"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <main-navigation-link
      ref="link"
      :uri="uri"
      :title="title"
      :aria-haspopup="hasChildren"
      :class="$style['menu-link']"
      class="menu-link"
    />

    <button
      v-if="hasChildren"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :class="$style['btn-show-submenu']"
      @click="toggleMenu"
    >
      <app-icon
        icon="chevron-down"
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
        <ul v-show="isOpen" :class="$style.submenu" class="tile">
          <li
            v-for="subItem in children.edges"
            :key="subItem.node.id"
            :class="$style['submenu-item']"
            class="submenu-item"
          >
            <main-navigation-link
              :uri="subItem.node.uri"
              :title="subItem.node.title"
              :class="$style['submenu-link']"
              class="submenu-link"
            />
          </li>
        </ul>
      </animation-slide-in>
    </template>
  </li>
</template>

<script>
import AnimationSlideIn from '~/components/Animations/SlideInAnimation.vue'
import EventBusUtil from '~/utils/eventBusUtil'
import MainNavigationLink from '~/components/Menu/MainNavigation/MainNavigationLink.vue'

export default {
  components: {
    AnimationSlideIn,
    MainNavigationLink,
  },
  props: {
    uri: {
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
    isSmallScreen() {
      return window.innerWidth < 768
    },
  },
}
</script>

<style lang="postcss" module>
.menu-item {
  position: relative;
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
  font-size: var(--font-size-xl);
  border-bottom-width: 2px;

  @nest .menu-item:first-child & {
    border-top: 2px solid currentColor;

    @media (--show-full-navigation) {
      border-top: 0;
    }
  }

  &[aria-haspopup='true'] {
    padding-right: var(--spacing-m);
  }

  @media (--show-full-navigation) {
    color: var(--color-white);
    border-bottom-width: 0;
  }
}

.submenu-link {
  border-bottom-width: 1px;

  @media (--show-full-navigation) {
    border-bottom: 0;
    color: var(--color-black);
    padding: var(--spacing-xxs) var(--spacing-xs);
  }

  @nest .submenu-item:last-child & {
    border-bottom-width: 0;
  }

  &:global(.nuxt-link-exact-active) :global(.title) {
    box-shadow: 0 2px 0 0 currentColor;
  }
}

.btn-show-submenu {
  display: block;
  position: absolute;
  width: var(--spacing-l);
  height: var(--spacing-l);

  right: calc(var(--spacing-xs) * -1);
  top: var(--spacing-xs);

  @media (--show-full-navigation) {
    color: var(--color-white);
  }
}

.icon {
  transition: transform var(--animation);
  @nest [aria-expanded='true'] & {
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
      content: '';
      height: 0;
      width: 0;
      left: var(--spacing-m);
      top: calc(-1 * var(--spacing-xs));
      border-left: 0.5em solid transparent;
      border-right: 0.5em solid transparent;
      border-bottom: 0.5em solid var(--color-white);
    }

    @nest .menu-item:last-child & {
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

<i18n>
{
  "nl": {
    "showSubmenuFor": "Toon submenu voor %{title}"
  }
}
</i18n>
