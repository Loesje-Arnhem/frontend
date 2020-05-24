<template>
  <nav aria-labelledby="menu" :class="$style.nav">
    <h2 id="menu" class="sr-only" tabindex="-1">
      {{ $t('title') }}
    </h2>

    <div ref="menu">
      <main-navigation-container>
        <template v-slot="data">
          <ul :class="$style.menu">
            <main-navigation-item
              :title="$t('pages.home')"
              :uri="localePath({ name: 'index' })"
            />
            <main-navigation-item
              :title="$t('pages.posters')"
              :uri="localePath({ name: 'posters' })"
            />
            <main-navigation-item
              :title="data.about.title"
              :uri="data.about.uri"
              :children="data.about.childPages"
              :reset-submenu="menuIsOpen"
            />
            <main-navigation-item
              :title="data.join.title"
              :uri="data.join.uri"
              :children="data.join.childPages"
              :reset-submenu="menuIsOpen"
            />
            <main-navigation-item
              :title="$t('pages.workshops')"
              :uri="localePath({ name: 'workshops' })"
            />

            <main-navigation-item
              v-if="data.productCategories.edges.length"
              :title="$t('pages.shop')"
              :uri="data.productCategories.edges[0].node.uri"
              :children="data.productCategories"
              :reset-submenu="menuIsOpen"
            />
          </ul>
          <div
            :class="[$style.arrow, { [$style.active]: mounted }]"
            :style="{ transform: arrowPosition, width: arrowWidth }"
          />
        </template>
      </main-navigation-container>
    </div>
  </nav>
</template>

<script>
import { debounce } from 'throttle-debounce'
import MainNavigationItem from '~/components/Menu/MainNavigation/MainNavigationItem.vue'
import MainNavigationContainer from '~/components/Menu/MainNavigation/MainNavigationContainer.vue'

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
        const title = activeLink.querySelector('.title')
        this.arrowPosition = `translateX(${activeLink.parentElement.offsetLeft}px)`
        this.arrowWidth = `${title.offsetWidth}px`
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

  @media (--show-full-navigation) {
    display: block;
  }

  &.active {
    transition: all var(--animation);
  }
}
</style>

<i18n>
{
  "nl": {
    "title": "Hoofdmenu"
  }
}
</i18n>
