<template>
  <div>
    <app-button
      :is-primary="false"
      :class="{ 'is-active': isInFavorites }"
      @click="toggleFavorite"
    >
      <app-icon :class="$style.icon" icon="heart" width="20" height="20" />
      {{ title }}
      <span class="sr-only">Toevoegen aan favorieten</span>
    </app-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    poster: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('favorites', ['list']),

    isInFavorites() {
      return this.$store.getters['favorites/isInFavorites'](this.poster.id)
    },
    title() {
      if (this.isInFavorites) {
        return this.$t('remove')
      }
      return this.$t('add')
    },
  },
  methods: {
    ...mapActions('favorites', ['add', 'remove']),
    toggleFavorite() {
      if (this.isInFavorites) {
        this.remove(this.poster.id)
      } else {
        const { id, uri, featuredImage } = this.poster

        const poster = {
          node: {
            id,
            uri,
            featuredImage: {
              node: {
                medium: featuredImage.node.medium,
              },
            },
          },
        }
        this.add(poster)
      }
    },
  },
}
</script>

<style lang="postcss" module>
.icon {
  margin-right: 0.25em;
  height: 1em;
  width: auto;
  transform: translateY(0.1em);

  @nest :global(.is-active) & {
    filter: invert(1);
  }
}
</style>

<i18n>
{
  "nl": {
    "add": "Voeg toe aan je favorieten",
    "remove": "Verwijder uit je favorieten"
  }
}
</i18n>
