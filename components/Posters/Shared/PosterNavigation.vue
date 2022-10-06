<template>
  <center-wrapper>
    <nav>
      <nuxt-link :to="localePath({ name: 'posters' })" class="btn-search">
        <app-icon icon="chevron-left" width="12" height="12" />
        Overzicht
      </nuxt-link>
      <nuxt-link
        :to="localePath({ name: 'posters-search' })"
        class="btn-search"
      >
        <app-icon icon="search" width="12" height="12" />
        Zoeken
      </nuxt-link>
      <nuxt-link
        :to="localePath({ name: 'posters-favorites' })"
        class="btn-favorites"
      >
        <app-icon icon="heart" width="12" height="12" />
        Jouw favorieten
      </nuxt-link>
    </nav>
  </center-wrapper>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import useFavorites from '~/composables/useFavorites'

export default defineComponent({
  setup() {
    const { favorites } = useFavorites()
    const { app } = useContext()
    const route = useRoute()

    const showFavorites = computed(() => {
      if (!process.client) {
        return false
      }

      const path = app.localeRoute({ name: 'posters-favorites' })
      return favorites.value.length && route.value.name !== path?.name
    })

    const showOverview = computed(() => {
      const path = app.localeRoute({ name: 'posters' })
      return route.value.name !== path?.name
    })
    return {
      showOverview,
      showFavorites,
    }
  },
})
</script>

<style scoped lang="postcss">
nav {
  /* display: flex;
  margin: 1em 0;
  height: 1em; */

  @mixin color-negative;

  border-top: 1px solid #fff;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: fixed;
  inset: auto 0 0;
  z-index: 12938129;
}

a {
  @mixin link-reset;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.1em;
  padding: 0.25em;

  &:not(:last-child) {
    border-right: 1px solid currentcolor;
  }

  &.nuxt-link-exact-active {
    text-decoration: underline;
  }
}

.icon {
  @mixin icon;

  transition: transform ease-out 0.2s;
  transform: translate(0, 0.1em);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-0.5em);
  opacity: 0;
}
</style>
