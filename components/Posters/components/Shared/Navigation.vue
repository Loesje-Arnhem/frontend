<template>
  <nav>
    <RouterLink
      v-if="!isSearch"
      :to="{name: 'Search'}"
      class="btn-search"
    >
      <Icon
        icon="chevron-left"
        class="icon"
      />Terug naar het overzicht
    </RouterLink>
    <Transition name="slide">
      <RouterLink
        v-if="totalFavorites && !isFavorites"
        :to="{name: 'Favorites'}"
        class="btn-favorites"
      >
        {{ favoritesText }}
        <Icon
          icon="chevron-right"
          class="icon"
        />
      </RouterLink>
    </Transition>
  </nav>
</template>

<script>
import Icon from '@/components/Shared/Icon.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Icon,
  },
  computed: {
    ...mapGetters({
      totalFavorites: 'favorites/total',
    }),

    favoritesText() {
      return `Bekijk je ${this.counter(
        this.totalFavorites,
      )} favoriete poster${this.plural(this.totalFavorites)}`;
    },
    isSearch() {
      return this.$route.name === 'Search';
    },
    isFavorites() {
      return this.$route.name === 'Favorites';
    },
  },
  methods: {
    counter(count) {
      switch (count) {
        case 1:
          return '';
        case 2:
          return 'twee';
        case 3:
          return 'drie';
        case 4:
          return 'vier';
        case 5:
          return 'vijf';
        case 6:
          return 'zes';
        case 7:
          return 'zeven';
        case 8:
          return 'acht';
        case 9:
          return 'negen';
        case 10:
          return 'tien';
        case 11:
          return 'elf';
        case 12:
          return 'twaalf';
        case 13:
          return 'dertien';
        case 14:
          return 'veertien';
        case 15:
          return 'vijftien';
        case 16:
          return 'zestien';
        case 17:
          return 'zeventien';
        case 18:
          return 'achttien';
        case 19:
          return 'negentien';
        case 20:
          return 'twintig';
        default:
          return count;
      }
    },
    plural(count) {
      if (count === 1) return '';
      return 's';
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  margin-bottom: 1em;
}

a {
  display: flex;
  align-items: center;
}

.btn-search {
  .icon {
    margin-right: 0.25em;
  }

  &:hover .icon {
    transform: translate(-0.2em, 0.1em);
  }
}

.btn-favorites {
  margin-left: auto;

  .icon {
    margin-left: 0.25em;
  }

  &:hover .icon {
    transform: translate(0.2em, 0.1em);
  }
}

.icon {
  @mixin icon 0.8em;
  transition: transform ease-out 0.2s;
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
