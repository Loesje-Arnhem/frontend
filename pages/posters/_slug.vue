<template>
  <div class="wrapper">
    <navigation />

    <h1 class="sr-only">{{ poster.title.rendered }}</h1>

    <div class="grid">
      <Poster :poster="poster" class="poster" />
      <div class="content">
        <div class="meta-data">
          <post-date :date="poster.date" />
        </div>
      </div>
      <button
        type="button"
        class="btn-favorites"
        :class="{ 'is-active': isInFavorites }"
        @click="toggleFavorites(poster)"
      >
        <icon-heart aria-hidden="true" width="32" height="32" />

        Voeg toe aan je favorieten
      </button>
      <social-media-links
        :title="`Deel ${poster.title.rendered}`"
        :social-media="socialMedia"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import axios from '~/plugins/axios'
import PostDate from '@/components/PostDate.vue'
import Poster from '@/components/Shared/Poster.vue'
import SocialMediaLinks from '@/components/Shared/SocialMediaLinks.vue'
import IconHeart from '@/assets/icons/heart-o.svg'
import Navigation from '@/components/Shared/Navigation.vue'

export default {
  components: {
    PostDate,
    Poster,
    SocialMediaLinks,
    IconHeart,
    Navigation
  },
  data() {
    return {
      title: '',
      text: '',
      date: ''
    }
  },
  computed: {
    socialMedia() {
      return {
        twitter: `https://twitter.com/share?text=${this.poster.title.rendered}&url=${this.poster.link}`,
        facebook: `https://www.facebook.com/sharer.php?u=${this.poster.link}&p=${this.poster.title.rendered}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${this.poster.link}&media=${this.poster.fimg_url}&description=${this.poster.title.rendered}`
      }
    },
    isInFavorites() {
      return this.$store.getters['favorites/isInFavorites'](this.slug)
    }
  },

  async asyncData({ params }) {
    const response = await axios.get(`wp/v2/poster/`, {
      params: {
        slug: params.slug
      }
    })
    const poster = response.data[0]

    return {
      title: poster.title.rendered,
      poster
    }
  },
  methods: {
    addTag(item) {},
    ...mapActions({
      toggleFavorites: 'favorites/toggle',
      addTagToStore: 'tags/addTag'
    })
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="postcss" scoped>
.wrapper {
  @mixin block;
  @mixin center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}

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
