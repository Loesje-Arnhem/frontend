<template>
  <center-wrapper>
    <nav>
      <transition name="slide">
        <nuxt-link
          v-if="showOverview"
          :to="localePath({ name: 'posters' })"
          class="btn-search"
        >
          <app-icon icon="chevron-left" width="12" height="12" />
          Overzicht
        </nuxt-link>
      </transition>
      <transition name="slide">
        <nuxt-link
          v-if="showFavorites"
          :to="localePath({ name: 'posters-favorites' })"
          class="btn-favorites"
        >
          Jouw favorieten
          <app-icon icon="chevron-right" width="12" height="12" />
        </nuxt-link>
      </transition>
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
  display: flex;
  margin: 1em 0;
  height: 1em;
}

a {
  display: flex;
  align-items: center;
}

.icon {
  @mixin icon 0.8em;

  transition: transform ease-out 0.2s;
  transform: translate(0, 0.1em);
}

/* stylelint-disable no-descending-specificity */
.btn-search {
  & .icon {
    margin-right: 0.25em;
  }

  &:hover .icon {
    transform: translate(-0.2em, 0.1em);
  }
}

.btn-favorites {
  margin-left: auto;

  & .icon {
    margin-left: 0.25em;
  }

  &:hover .icon {
    transform: translate(0.2em, 0.1em);
  }
}
/* stylelint-enable no-descending-specificity */

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
