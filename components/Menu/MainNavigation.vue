<template>
  <nav aria-labelledby="menu-title" class="nav">
    <h2 id="menu-title" class="sr-only" tabindex="-1">
      {{ $t('mainNavigation') }}
    </h2>

    <ul v-if="menu.edges.length" ref="menu" class="menu">
      <main-navigation-item
        v-for="item in menu.edges[0].node.menuItems.edges"
        :key="item.node.label"
        :item="item.node"
      />
    </ul>

    <div
      class="arrow"
      :class="{ active: mounted }"
      :style="{ transform: arrowPosition, width: arrowWidth }"
    />
  </nav>
</template>

<script>
import MenuQuery from '~/graphql/Menu.gql'
import MainNavigationItem from '@/components/Menu/MainNavigationItem.vue'

export default {
  components: {
    MainNavigationItem
  },
  data() {
    return {
      arrowPosition: 0,
      arrowWidth: 0,
      mounted: false
    }
  },

  watch: {
    $route() {
      this.$nextTick(() => {
        this.setArrowPosition()
      })
    }
  },
  mounted() {
    this.setArrowPosition()
    setTimeout(() => {
      this.mounted = true
    }, 0)
  },
  methods: {
    setArrowPosition() {
      const activeLink = this.$refs.menu.querySelector(
        '.nuxt-link-active[aria-haspopup=true], .nuxt-link-exact-active'
      )
      if (activeLink) {
        this.arrowPosition = `translateX(${activeLink.parentElement.offsetLeft}px)`
        this.arrowWidth = `${activeLink.offsetWidth}px`
      }
    }
  },
  apollo: {
    menu: {
      query: MenuQuery,
      variables: {
        location: 'HEADER_MENU'
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
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
