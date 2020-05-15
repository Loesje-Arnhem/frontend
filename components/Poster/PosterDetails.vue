<template>
  <div class="poster-details">
    <article class="content">
      <h1 class="sr-only">{{ poster.title }}</h1>
      <app-image
        v-if="poster.featuredImage"
        :alt="poster.title"
        :src="poster.featuredImage.large"
        class="image"
      />
    </article>
    <div class="meta-data">
      <app-date :date="poster.date" />
      <dl class="tags">
        <template v-if="poster.subjects.edges.length">
          <dt>Onderwerpen:</dt>
          <dd>
            <poster-filter-tags
              :list="poster.subjects.edges"
              taxonomy="subject"
            />
          </dd>
        </template>

        <template v-if="poster.sources.edges.length">
          <dt>Bronnen:</dt>
          <dd>
            <poster-filter-tags
              :list="poster.sources.edges"
              taxonomy="source"
            />
          </dd>
        </template>
      </dl>
      <poster-favorites :poster="poster" />

      <div class="social-media">
        <h3>Deel de poster op</h3>
        <social-media-links
          :title="`Deel ${poster.title}`"
          :social-media="socialMedia"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppDate from '~/components/Shared/AppDate.vue'
import AppImage from '~/components/Shared/AppImage.vue'
import SocialMediaLinks from '~/components/Shared/SocialMediaLinks.vue'
import PosterFavorites from '~/components/Posters/Details/PosterFavorites.vue'
import PosterFilterTags from '~/components/Posters/Filters/PosterFilterTags.vue'

export default {
  components: {
    AppDate,
    AppImage,
    SocialMediaLinks,
    PosterFavorites,
    PosterFilterTags,
  },

  props: {
    poster: {
      type: Object,
      required: true,
    },
  },

  computed: {
    socialMedia() {
      return {
        twitter: `https://twitter.com/share?text=${this.poster.title}&url=${this.poster.link}`,
        facebook: `https://www.facebook.com/sharer.php?u=${this.poster.link}&p=${this.poster.title}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${this.poster.link}&media=${this.poster.featuredImage.large}&description=${this.poster.title}`,
      }
    },
    isInFavorites() {
      return this.$store.getters['favorites/isInFavorites'](
        this.poster.posterId,
      )
    },
  },

  methods: {
    ...mapActions({
      toggleFavorites: 'favorites/toggle',
    }),
  },
}
</script>

<style lang="postcss" scoped>
.image {
  --rough-stroke-width: 3px;
  --rough-roughness: 1.5;

  border: var(--rough-stroke-width) solid var(--rough-stroke);

  @nest .is-loaded & {
    @supports (border-image-source: paint(rough-boxes)) {
      border-image-source: paint(rough-boxes);
      border-image-slice: 0 fill;
      border-image-outset: 1em;
    }
  }
}

.poster-details {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 2em;
}

.btn-favorites {
  padding: 0.25em 0.75em;
  border: 2px solid var(--color-black);
  border-radius: 1em;
  background: var(--color-white);

  &.is-active,
  &:hover {
    background: var(--color-black);
    color: var(--color-white);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--color-black);
    outline: none;
  }
}

dt {
  font-weight: var(--font-weight-bold);
}

dd {
  margin-left: 0;
}
</style>
