<template>
  <div class="poster-details">
    <article class="content">
      <h1 class="sr-only">{{ poster.title }}</h1>
      {{ poster }}
      <app-image
        v-if="poster.featuredImage"
        :src="poster.featuredImage.large"
      />
      <div class="meta-data">
        <post-date :date="poster.date" />
        <dl>
          <template v-if="poster.subjects.edges.length">
            <dt>Onderwerpen:</dt>
            <dd>
              <ul class="tags">
                <li v-for="item in poster.subjects.edges" :key="item.node.id">
                  <button
                    type="button"
                    class="btn-tag"
                    @click="addTag(item.node)"
                  >
                    {{ item.node.name }}
                  </button>
                </li>
              </ul>
            </dd>
          </template>

          <template v-if="poster.sources.length">
            <dt>Bronnen:</dt>
            <dd>
              <ul class="tags">
                <li v-for="item in poster.sources" :key="item.id">
                  <button type="button" class="btn-tag" @click="addTag(item)">
                    {{ item.name }}
                  </button>
                </li>
              </ul>
            </dd>
          </template>
        </dl>
      </div>
    </article>
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
</template>

<script>
import { mapActions } from 'vuex'
import PostDate from '@/components/PostDate.vue'
import AppImage from '@/components/Shared/AppImage.vue'
import SocialMediaLinks from '@/components/Shared/SocialMediaLinks.vue'
import IconHeart from '@/assets/icons/heart-o.svg'

export default {
  components: {
    PostDate,
    AppImage,
    SocialMediaLinks,
    IconHeart
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
      return this.$store.getters['favorites/isInFavorites'](this.slug)
    }
  },

  methods: {
    addTag(item) {},
    ...mapActions({
      toggleFavorites: 'favorites/toggle',
      addTagToStore: 'tags/addTag'
    })
  }
}
</script>

<style lang="postcss" scoped>
.poster {
  grid-row: span 2;
}

.meta-data,
.social-bar {
  background: $gray-lighter;
}

.meta-data {
  padding: 1em 1em 0.25em;
}

dt {
  border-top: 1px solid var(--color-white);
  padding: 0.5em 0 0;
  font-weight: $font-weight-bold;
}

dd {
  margin: 0;
}

.tags {
  @mixin list-reset;
  margin-bottom: 0.5em;

  li {
    display: inline;

    &:not(:last-child)::after {
      content: ',';
      margin-right: 0.5ch;
    }
  }
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

.icon-favorites {
  flex: 0 0 auto;
  margin-top: -0.1em;
  margin-right: 0.5em;
}

.btn-tag {
  text-decoration: underline;
}
</style>
