<template>
  <center-wrapper>
    <nav>
      <transition name="slide">
        <nuxt-link
          v-if="!isSearch"
          :to="localePath({ name: 'posters' })"
          class="btn-search"
        >
          <app-icon icon="chevron-left" width="12" height="12" />
          Overzicht
        </nuxt-link>
      </transition>
      <transition name="slide">
        <nuxt-link
          v-if="total && !isFavorites"
          :to="localePath({ name: 'posters-favorites' })"
          class="btn-favorites"
        >
          {{ favoritesText }}
          <app-icon icon="chevron-right" width="12" height="12" />
        </nuxt-link>
      </transition>
    </nav>
  </center-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('favorites', ['total']),

    favoritesText() {
      return `Bekijk je ${this.counter(
        this.total,
      )} favoriete poster${this.plural(this.total)}`
    },
    isSearch() {
      return this.$route.path === this.localePath({ name: 'posters' })
    },
    isFavorites() {
      return this.localePath({ name: 'posters-favorites' }) === this.$route.path
    },
  },
  methods: {
    counter(count) {
      switch (count) {
        case 1:
          return ''
        case 2:
          return 'twee'
        case 3:
          return 'drie'
        case 4:
          return 'vier'
        case 5:
          return 'vijf'
        case 6:
          return 'zes'
        case 7:
          return 'zeven'
        case 8:
          return 'acht'
        case 9:
          return 'negen'
        case 10:
          return 'tien'
        case 11:
          return 'elf'
        case 12:
          return 'twaalf'
        case 13:
          return 'dertien'
        case 14:
          return 'veertien'
        case 15:
          return 'vijftien'
        case 16:
          return 'zestien'
        case 17:
          return 'zeventien'
        case 18:
          return 'achttien'
        case 19:
          return 'negentien'
        case 20:
          return 'twintig'
        default:
          return count
      }
    },
    plural(count) {
      if (count === 1) return ''
      return 's'
    },
  },
}
</script>

<style scoped>
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
