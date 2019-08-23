<template>
  <div>
    <Navigation />

    <template v-if="poster">
      <div class="wrapper">
        <h1 class="sr-only">{{ poster.title.rendered }}</h1>

        <Poster :poster="poster" class="poster" />
        <div class="content">
          <div class="meta-data">
            {{ poster.date | formatDate }}
            <br />
            <button
              type="button"
              class="btn-favorites"
              :class="{ 'is-active': isInFavorites }"
              @click="toggleFavorites(poster)"
            >
              <Icon icon="heart-o" class="icon-favorites" />
              <template v-if="isInFavorites"
                >Verwijder uit je favorieten</template
              >
              <template v-else
                >Voeg toe aan je favorieten</template
              >
            </button>
            <dl>
              <template v-if="posterSubjects.length">
                <dt>Onderwerpen:</dt>
                <dd>
                  <ul class="tags">
                    <li v-for="item in posterSubjects" :key="item.id">
                      <button
                        type="button"
                        class="btn-tag"
                        @click="addTag(item)"
                      >
                        {{ item.name }}
                      </button>
                    </li>
                  </ul>
                </dd>
              </template>

              <template v-if="posterSources.length">
                <dt>Bronnen:</dt>
                <dd>
                  <ul class="tags">
                    <li v-for="item in posterSources" :key="item.id">
                      <button
                        type="button"
                        class="btn-tag"
                        @click="addTag(item)"
                      >
                        {{ item.name }}
                      </button>
                    </li>
                  </ul>
                </dd>
              </template>
            </dl>
          </div>
        </div>
        <SocialMedia :poster="poster" />
      </div>

      <List :subjects="poster.subject" :exclude="poster.id" />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

import Poster from '@/components/Shared/Poster.vue'
import List from '@/components/Shared/List.vue'
import Icon from '@/components/Shared/Icon.vue'
import Navigation from '@/components/Shared/Navigation.vue'
import SocialMedia from '@/components/Details/SocialMedia.vue'

export default {
  components: {
    Poster,
    List,
    Icon,
    Navigation,
    SocialMedia
  },
  filters: {
    formatDate(value) {
      const posterDate = new Date(value)
      return posterDate.toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  data() {
    return {
      poster: null,
      slug: this.$route.params.slug
    }
  },
  computed: {
    ...mapGetters({
      sources: 'tags/sources',
      subjects: 'tags/subjects'
    }),
    isInFavorites() {
      return this.$store.getters['favorites/isInFavorites'](this.slug)
    },
    posterSources() {
      return this.findTags(this.poster.source, this.sources)
    },
    posterSubjects() {
      return this.findTags(this.poster.subject, this.subjects)
    }
  },
  mounted() {
    this.getPoster()
  },
  methods: {
    ...mapActions({
      toggleFavorites: 'favorites/toggle',
      addTagToStore: 'tags/addTag'
    }),

    addTag(item) {
      this.addTagToStore(item)
      this.$router.push({ name: 'Search' })
    },
    getPosterFromFavorites() {
      return false
    },
    findTags(tagsFromPoster, tagsFromApp) {
      const array = []
      tagsFromPoster.forEach(itemFromPoster => {
        const foundedItem = tagsFromApp.find(
          itemFromApp => itemFromApp.id === itemFromPoster
        )
        array.push(foundedItem)
      })
      return array
    },
    getPoster() {
      if (this.isInFavorites) {
        this.poster = this.isInFavorites
      } else {
        this.getPosterFromApi()
      }
    },
    async getPosterFromApi() {
      try {
        const response = await axios.get('poster', {
          params: {
            slug: this.slug
          }
        })
        ;[this.poster] = response.data
      } catch (error) {
        window.console.error(error)
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getPoster()
  }
}
</script>

<style scoped>
.wrapper {
  margin: 0 0 1em;
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
  @mixin icon;
  flex: 0 0 auto;
  margin-top: -0.1em;
  margin-right: 0.5em;
}

.btn-tag {
  text-decoration: underline;
}
</style>
