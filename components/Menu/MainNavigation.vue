<template>
  <nav aria-labelledby="menu-title" :class="$style.nav">
    <h2 id="menu-title" class="sr-only" tabindex="-1">
      {{ $t('mainNavigation') }}
    </h2>

    <ul ref="menu" class="menu">
      <main-navigation-container>
        <template v-slot="data">
          <ul :class="$style.menu">
            <main-navigation-item
              :title="$t('pages.home')"
              :url="localePath({ name: 'index' })"
            />
            <main-navigation-item
              :title="$t('pages.posters')"
              :url="localePath({ name: 'posters' })"
            />
            <main-navigation-item
              :title="data.about.title"
              :url="data.about.uri"
              :children="data.about.childPages"
              :reset-submenu="menuIsOpen"
            />
            <main-navigation-item
              :title="data.join.title"
              :url="data.join.uri"
              :children="data.join.childPages"
              :reset-submenu="menuIsOpen"
            />
            <main-navigation-item
              :title="$t('pages.workshops')"
              :url="localePath({ name: 'workshops' })"
            />
            <main-navigation-item
              :title="$t('pages.shop')"
              :url="localePath({ name: 'shop' })"
              :children="data.productCategories"
              :reset-submenu="menuIsOpen"
            />
          </ul>
        </template>
      </main-navigation-container>
    </ul>

    <div
      :class="[$style.arrow, { [$style.active]: mounted }]"
      :style="{ transform: arrowPosition, width: arrowWidth }"
    />
  </nav>
</template>

<script>
import { debounce } from 'throttle-debounce'
import MainNavigationItem from '~/components/Menu/MainNavigationItem.vue'
import MainNavigationContainer from '~/components/Menu/MainNavigationContainer.vue'

export default {
  components: {
    MainNavigationItem,
    MainNavigationContainer,
  },
  props: {
    menuIsOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      arrowPosition: 0,
      arrowWidth: 0,
      mounted: false,
    }
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.setArrowPosition()
      })
    },
  },
  mounted() {
    this.setArrowPosition()
    setTimeout(() => {
      this.mounted = true
    }, 0)
    window.addEventListener('resize', this.updateArrowAfterResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.updateArrowAfterResize)
  },
  methods: {
    updateArrowAfterResize() {
      debounce(500, this.setArrowPosition())
    },
    setArrowPosition() {
      const activeLink = this.getMainLink()

      if (activeLink) {
        this.arrowPosition = `translateX(${activeLink.parentElement.offsetLeft}px)`
        this.arrowWidth = `${activeLink.offsetWidth}px`
      } else {
        this.arrowWidth = 0
      }
    },
    getMainLink() {
      let activeLink = this.$refs.menu.querySelector(
        '.menu-link.nuxt-link-active[aria-haspopup=true], .menu-link.nuxt-link-exact-active',
      )
      if (activeLink) {
        return activeLink
      }
      const activeSubLink = this.$refs.menu.querySelector(
        '.submenu-link.nuxt-link-exact-active',
      )
      if (activeSubLink) {
        const menuItem = activeSubLink.closest('.menu-item.has-popup')
        activeLink = menuItem.querySelector('.menu-link')
        return activeLink
      }
      return null
    },
  },
}
</script>

<style lang="postcss" module>
.nav {
  @mixin color-negative;
  @mixin notch;

  position: relative;
}

.menu {
  @mixin list-reset;
  @mixin center;

  @media (--show-full-navigation) {
    display: flex;
    justify-content: space-between;
  }
}

.arrow {
  height: 0.2em;
  background: currentColor;
  display: block;
  pointer-events: none;
  position: absolute;
  bottom: 0.5em;

  &.active {
    transition: all 0.2s ease-out;
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
