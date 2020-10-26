<template>
  <div>
    <app-button
      :is-primary="false"
      :class="{ 'is-active': isInFavorites }"
      @click="toggleFavorite"
    >
      <icon-heart
        :class="$style.icon"
        aria-hidden="true"
        width="20"
        height="20"
      />
      {{ title }}
    </app-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AppButton from '~/components/Shared/AppButton.vue'
import IconHeart from '~/assets/icons/heart-o.svg'

export default {
  components: {
    AppButton,
    IconHeart,
  },
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
  transform: translateY(0.1em);
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
