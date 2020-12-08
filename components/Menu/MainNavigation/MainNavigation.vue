<template>
  <nav aria-labelledby="menu" :class="$style.nav">
    <h2 id="menu" class="sr-only" tabindex="-1">
      {{ $t('title') }}
    </h2>
    <div ref="menu">
      <ul :class="$style.menu">
        <main-navigation-item
          class="home"
          :title="$t('pages.home')"
          :uri="localePath({ name: 'index' })"
        />
        <main-navigation-item
          class="page"
          :title="$t('pages.posters')"
          :uri="localePath({ name: 'posters' })"
        />
        <main-navigation-item
          class="page"
          :title="menu.aboutPage.title"
          :uri="menu.aboutPage.uri"
          :children="menu.aboutPageChildren"
          :reset-submenu="menuIsOpen"
        />
        <main-navigation-item
          class="page"
          :title="menu.joinPage.title"
          :uri="menu.joinPage.uri"
          :children="menu.joinPageChildren"
          :reset-submenu="menuIsOpen"
        />
        <main-navigation-item
          class="page"
          :title="$t('pages.workshops')"
          :uri="localePath({ name: 'workshops' })"
        />

        <main-navigation-item
          v-if="menu.productCategories.edges.length"
          class="page"
          :title="$t('pages.shop')"
          :reset-submenu="menuIsOpen"
          :uri="menu.productCategories.edges[0].node.uri"
          :children="menu.productCategories"
        />
      </ul>
      <div
        :class="[$style.arrow, { [$style.active]: mounted }]"
        :style="{ transform: arrowPosition, width: arrowWidth }"
      />
    </div>
  </nav>
</template>

<script>
import { debounce } from 'throttle-debounce'
import { mapState } from 'vuex'
import MainNavigationItem from '~/components/Menu/MainNavigation/MainNavigationItem.vue'

export default {
  components: {
    MainNavigationItem,
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
  computed: {
    ...mapState('menu', ['menu']),
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
      const activeLink = this.$refs.menu.querySelector(
        '.home .nuxt-link-exact-active',
      )
      if (activeLink) {
        return activeLink
      }
      return this.$refs.menu.querySelector('.page .nuxt-link-active')
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
