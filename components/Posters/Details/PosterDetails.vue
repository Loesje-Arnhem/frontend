<template>
  <div class="poster-details">
    <article class="content">
      <h1 v-if="poster" class="sr-only">{{ poster.title }}</h1>
      <div class="embed-container">
        <div class="tile image-wrapper">
          <app-image
            v-if="poster && poster.featuredImage"
            :alt="poster.title"
            :src="poster.featuredImage.node.large"
            class="image"
          />
        </div>
      </div>
    </article>
    <div class="meta-data">
      <template v-if="poster">
        <dl class="definition-list">
          <dt class="definition-title">Publicatiedatum</dt>
          <dd class="definition-item">
            <app-date :date="poster.PosterMetaGroup.date" />
          </dd>

          <template v-if="poster.subjects.edges.length">
            <dt class="definition-title">Onderwerpen:</dt>
            <dd class="definition-item">
              <poster-tags-list
                :list="poster.subjects.edges"
                class="tags-list"
              />
            </dd>
          </template>

          <template v-if="poster.sources.edges.length">
            <dt class="definition-title">Bronnen:</dt>
            <dd class="definition-item">
              <poster-tags-list
                :list="poster.sources.edges"
                class="tags-list"
              />
            </dd>
          </template>
        </dl>
        <div class="buttons">
          <poster-favorites :poster="poster" />
          <app-button
            v-if="poster.PosterMetaGroup.pdf"
            :is-primary="false"
            button-tag="a"
            :href="poster.PosterMetaGroup.pdf.mediaItemUrl"
            target="_blank"
          >
            <app-icon icon="pdf" width="32" height="32" class="icon" />
            Download
          </app-button>
        </div>
        <div class="social-media">
          <share-this
            :title="poster.title"
            :link="poster.link"
            :image="poster.featuredImage.node.large"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IPoster } from '~/interfaces/IPoster'

export default defineComponent({
  props: {
    poster: {
      type: Object as PropType<IPoster | null>,
      default: null,
    },
  },
})
</script>

<style lang="postcss" scoped>
.poster-details {
  display: grid;
  grid-gap: 1em;
  margin-bottom: 2em;

  @media (--viewport-sm) {
    grid-template-columns: 1fr 1fr;
  }

  @media print {
    grid-template-columns: 1fr;
  }
}

.image {
  width: 100%;
  display: block;
}

.image-wrapper {
  aspect-ratio: 721 / 1024;
}

.embed-container {
  /* stylelint-disable-next-line */
  page-transition-tag: embed-container;
  contain: paint;
}

.content {
  @media print {
    width: 95%;
    margin: 0 auto;
  }
}

.meta-data {
  display: flex;
  flex-direction: column;

  @mixin hide-for-print;
}

.definition-title {
  font-weight: var(--font-weight-bold);
  padding-top: 0;
}

.definition-list {
  margin: 0 0 1.5em;
}

.definition-item {
  margin-left: 0;
  margin-bottom: 0.5em;
}

.tags-list {
  margin-bottom: 0;
}

.social-media {
  margin-top: auto;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-bottom: 1.5em;
}

.icon {
  width: 1em;
  height: 1em;
}
</style>
