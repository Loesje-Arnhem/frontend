<template>
  <div :class="$style['poster-details']">
    <article class="content">
      <h1 class="sr-only">{{ poster.title }}</h1>
      <app-image
        v-if="poster.featuredImage"
        :alt="poster.title"
        :src="poster.featuredImage.large"
        :class="$style.image"
      />
    </article>
    <div :class="$style['meta-data']">
      <app-date :date="poster.date" />

      <dl>
        <template v-if="poster.subjects.edges.length">
          <dt :class="$style['taxonomy-title']">Onderwerpen:</dt>
          <dd :class="$style['taxonomy-list']">
            <poster-filter-tags
              :list="poster.subjects.edges"
              :class="$style['tags-list']"
            />
          </dd>
        </template>

        <template v-if="poster.sources.edges.length">
          <dt :class="$style['taxonomy-title']">Bronnen:</dt>
          <dd :class="$style['taxonomy-list']">
            <poster-filter-tags
              :list="poster.sources.edges"
              :class="$style['tags-list']"
            />
          </dd>
        </template>
      </dl>

      <poster-favorites :poster="poster" />

      <div :class="$style['social-media']">
        <social-media-links
          title="Deel de poster op"
          :twitter="twitter"
          :facebook="facebook"
          :pinterest="pinterest"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppDate from '~/components/Shared/AppDate.vue'
import AppImage from '~/components/Shared/AppImage.vue'
import SocialMediaLinks from '~/components/Shared/SocialMediaLinks.vue'
import PosterFavorites from '~/components/Posters/Details/PosterFavorites.vue'
import PosterFilterTags from '~/components/Posters/Tags/PosterTagsList.vue'

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
    twitter() {
      return `https://twitter.com/share?text=${this.poster.title}&url=${this.poster.link}`
    },
    facebook() {
      return `https://www.facebook.com/sharer.php?u=${this.poster.link}&p=${this.poster.title}`
    },
    pinterest() {
      return `https://pinterest.com/pin/create/button/?url=${this.poster.link}&media=${this.poster.featuredImage.large}&description=${this.poster.title}`
    },
  },
}
</script>

<style lang="postcss" module>
.poster-details {
  display: grid;
  grid-gap: 1em;
  margin-bottom: 2em;

  @media (--viewport-sm) {
    grid-template-columns: 1fr 1fr;
  }
}

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

.meta-data {
  display: flex;
  flex-direction: column;
}

.taxonomy-title {
  font-weight: var(--font-weight-bold);
}

.taxonomy-list {
  margin-left: 0;
}

.tags-list {
  margin-bottom: 0;
}

.social-media {
  margin-top: auto;
}
</style>
