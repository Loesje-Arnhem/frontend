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
      :to="uri"
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
.menu-item {
  position: relative;
  font-weight: var(--font-weight-headings);
}

/* stylelint-disable */
.submenu-link,
.menu-link {
  @mixin link-reset;

  color: var(--color-white);
  transition: border var(--animation);
  border-bottom-style: solid;
  border-bottom-color: var(--color-white);
  display: block;
  line-height: var(--line-height-headings);
  padding: var(--spacing-xs) 0;

  &:hover,
  &:focus,
  &:global(.nuxt-link-active[aria-haspopup='true']),
  &:global(.nuxt-link-exact-active) {
    color: var(--color-white);

    & + .btn-show-submenu {
      color: var(--color-white);
    }
  }
}

.menu-link {
  @mixin heading;

  font-size: var(--font-size-xl);
  border-bottom-width: 2px;

  @nest .menu-item:first-child & {
    border-top: 2px solid var(--color-white);

    @media (--navigation-md) {
      border-top: 0;
    }
  }

  &[aria-haspopup='true'] {
    padding-right: var(--spacing-m);
  }

  @media (--navigation-md) {
    &,
    &:global(.nuxt-link-active[aria-haspopup='true']),
    &:global(.nuxt-link-exact-active) {
      border-bottom: 2px solid transparent;
    }

    &:hover,
    &:focus {
      border-bottom-color: currentColor;
    }
  }
}

.submenu-link {
  font-size: var(--font-size-l);
  border-bottom-width: 1px;

  @media (--navigation-md) {
    padding: var(--spacing-xs) var(--spacing-xs);
    border-bottom-color: var(--color-white);
    border-left: 2px solid transparent;

    &:global(.nuxt-link-exact-active),
    &:hover,
    &:focus {
      border-left-color: currentColor;
    }
  }

  @nest .menu-item:last-child & {
    border-bottom-width: 0;
  }
}

.btn-show-submenu {
  display: block;
  position: absolute;
  width: var(--spacing-l);
  height: var(--spacing-l);

  right: calc(var(--spacing-xs) * -1);
  top: var(--spacing-xs);

  @media (--navigation-md) {
    top: var(--spacing-s);
  }
}

.icon {
  transition: transform var(--animation);
  @nest [aria-expanded='true'] & {
    transform: rotate(-180deg);

    @media (--navigation-md) {
      transform: rotate(0deg);
    }
  }
}

.submenu {
  @mixin list-reset;

  padding-left: var(--spacing-m);
  border-bottom: 2px solid var(--color-black);

  @media (--navigation-md) {
    border-bottom: 0;
    padding-left: 0;
    filter: drop-shadow(0 0 0.1em rgba(0, 0, 0, 0.2));
    background: var(--color-background);
    position: absolute;
    left: calc(-1 * var(--spacing-xs));
    top: 100%;
    white-space: nowrap;
    z-index: var(--z-main-navigation);
  }
}
</style>

<i18n>
{
  "nl": {
    "showSubmenuFor": "Toon submenu voor %{title}"
  },
  "de": {
    "showSubmenuFor": "Untermenü anzeigen für %{title}"
  },
  "en": {
    "showSubmenuFor": "Show submenu for %{title}"
  }
}
</i18n>
