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
      <post-date :date="poster.date" />
      <dl class="tags">
        <template v-if="poster.subjects.edges.length">
          <dt>Onderwerpen:</dt>
          <dd>
            <ul class="tags-list">
              <li
                v-for="item in poster.subjects.edges"
                :key="item.node.id"
                class="tag"
              >
                <poster-tag :tag="item.node" />
              </li>
            </ul>
          </dd>
        </template>

        <template v-if="poster.sources.edges.length">
          <dt>Bronnen:</dt>
          <dd>
            <ul class="tags-list">
              <li
                v-for="item in poster.sources.edges"
                :key="item.node.id"
                class="tag"
              >
                <poster-tag :tag="item.node" />
              </li>
            </ul>
          </dd>
        </template>
      </dl>
      <button
        type="button"
        class="btn-favorites"
        :class="{ 'is-active': isInFavorites }"
        @click="toggleFavorites(poster)"
      >
        <icon-heart aria-hidden="true" width="32" height="32" />Voeg toe aan je
        favorieten
      </button>
      <social-media-links
        :title="`Deel ${poster.title}`"
        :social-media="socialMedia"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PostDate from '@/components/PostDate.vue'
import AppImage from '@/components/Shared/AppImage.vue'
import PosterTag from '@/components/Poster/PosterTag.vue'
import SocialMediaLinks from '@/components/Shared/SocialMediaLinks.vue'
import IconHeart from '@/assets/icons/heart-o.svg'

export default {
  components: {
    PostDate,
    AppImage,
    SocialMediaLinks,
    IconHeart,
    PosterTag
  },

  props: {
    poster: {
      type: Object,
      required: true
    }
  },

  computed: {
    socialMedia() {
      return {
        twitter: `https://twitter.com/share?text=${this.poster.title}&url=${this.poster.link}`,
        facebook: `https://www.facebook.com/sharer.php?u=${this.poster.link}&p=${this.poster.title}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${this.poster.link}&media=${this.poster.featuredImage.large}&description=${this.poster.title}`
      }
    },
    isInFavorites() {
      return this.$store.getters['favorites/isInFavorites'](
        this.poster.posterId
      )
    }
  },

  methods: {
    ...mapActions({
      toggleFavorites: 'favorites/toggle'
    })
  }
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
  display: flex;
  padding: 0.25em 0.75em;
  border: 2px solid var(--color-black);
  border-radius: 1em;
  background: var(--color-white);
  align-items: center;

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

.tag {
  margin: 0 0.125em 0.125em;
}

.tags-list {
  @mixin list-reset;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.125em;
}

.icon-favorites {
  flex: 0 0 auto;
  margin-top: -0.1em;
  margin-right: 0.5em;
}
</style>
