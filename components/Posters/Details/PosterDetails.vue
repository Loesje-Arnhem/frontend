<template>
  <div class="poster-details">
    <article class="content">
      <h1 class="sr-only">{{ poster.title }}</h1>
      <div class="tile-wrapper">
        <div class="tile image-wrapper-details" :data-slug="poster.slug">
          <fade-animation>
            <featured-image
              v-if="poster.featuredImage"
              :key="poster.featuredImage.node.id"
              :lazy="false"
              :alt="poster.title"
              :image="poster.featuredImage"
              sizes="(max-width: 640px) 100vw, (max-width: 1240px) 50vw, 620px"
            />
          </fade-animation>
        </div>
      </div>
    </article>
    <div class="meta-data">
      <dl class="definition-list">
        <dt class="definition-title">Publicatiedatum</dt>
        <dd class="definition-item">
          <app-date :date="poster.PosterMetaGroup.date" />
        </dd>

        <template v-if="poster.subjects.edges.length">
          <dt class="definition-title">Onderwerpen:</dt>
          <dd class="definition-item">
            <poster-tags-list :list="poster.subjects.edges" class="tags-list" />
          </dd>
        </template>

        <template v-if="poster.sources.edges.length">
          <dt class="definition-title">Bronnen:</dt>
          <dd class="definition-item">
            <poster-tags-list :list="poster.sources.edges" class="tags-list" />
          </dd>
        </template>
      </dl>
      <div class="buttons">
        <poster-favorites :poster="poster" />
        <app-button
          v-if="poster.PosterMetaGroup.pdf"
          :is-primary="false"
          :href="poster.PosterMetaGroup.pdf.mediaItemUrl"
          target="_blank"
          :download="poster.slug"
        >
          <app-icon icon="pdf" width="32" height="32" class="icon" />
          Download
        </app-button>
      </div>
      <div class="social-media">
        <share-this
          v-if="poster.featuredImage"
          :title="poster.title"
          :link="`${baseUrl}${poster.uri}`"
          :image="poster.featuredImage.node.src"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IPoster } from '~/interfaces/IPoster'
import { baseUrl } from '~/data/siteDetails'

export default defineComponent({
  props: {
    poster: {
      type: Object as PropType<IPoster>,
      required: true,
    },
  },
  setup() {
    return { baseUrl }
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

.tile-wrapper {
  background: var(--color-white);
}

.tile {
  padding: 3px;
}
</style>
