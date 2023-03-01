<template>
  <nav aria-labelledby="menu" :class="$style.nav">
    <h2 id="menu" class="sr-only" tabindex="-1">
      {{ $t('title') }}
    </h2>
    <div ref="menu">
      <ul v-if="pages" :class="$style.menu">
        <main-navigation-item
          class="menu-item-home"
          :title="$t('pages.home')"
          :uri="localePath({ name: 'index' })"
        />
        <main-navigation-item
          class="menu-item-page"
          :title="$t('pages.posters')"
          :uri="localePath({ name: 'posters' })"
        />
        <main-navigation-item
          class="menu-item-page"
          :title="pages.aboutPage.title"
          :uri="pages.aboutPage.uri"
          :children="pages.aboutPageChildren"
        />
        <main-navigation-item
          class="menu-item-page"
          :title="pages.joinPage.title"
          :uri="pages.joinPage.uri"
          :children="pages.joinPageChildren"
        />
        <main-navigation-item
          class="menu-item-page"
          :title="$t('pages.workshops')"
          :uri="localePath({ name: 'workshops' })"
        />

        <main-navigation-item
          v-if="pages.productCategories.edges.length"
          class="menu-item-page"
          :title="$t('pages.shop')"
          :uri="localePath({ name: 'shop' })"
          :children="pages.productCategories"
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
import { defineComponent } from '@nuxtjs/composition-api'
import { debounce } from 'throttle-debounce'
import MainNavigationItem from '~/components/Menu/MainNavigation/MainNavigationItem.vue'
import pages from '~/data/menu'

export default defineComponent({
  components: {
    MainNavigationItem,
  },

  data() {
    return {
      pages,
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
    setTimeout(() => {
      this.mounted = true
    }, 0)
    window.addEventListener('resize', this.updateArrowAfterResize)
    this.$nextTick(() => {
      this.setArrowPosition()
    })
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
      const { menu } = this.$refs
      if (!menu) {
        return null
      }
      const activeLink = menu.querySelector(
        '.menu-item-home .nuxt-link-exact-active',
      )
      if (activeLink) {
        return activeLink
      }
      return menu.querySelector('.menu-item-page .nuxt-link-active')
    },
  },
})
</script>

<style lang="postcss" module>
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

  @media (--show-full-navigation) {
    display: block;
  }

  &.active {
    transition: all var(--animation);
  }
}
</style>

<!-- <i18n>
{
  "nl": {
    "title": "Hoofdmenu"
  }
}
<i18n> -->
