<script lang="ts" setup>
import type { IPoster } from "~/types/Content";

defineProps<{
  poster: IPoster;
}>();
</script>

<template>
  <div class="poster-details">
    <article class="content">
      <h1 class="sr-only">
        {{ poster.title }}
      </h1>
      <div class="tile-wrapper">
        <div class="tile image-wrapper-details" :data-slug="poster.slug">
          <fade-animation>
            <featured-image
              v-if="poster.featuredImage"
              :key="poster.id"
              :lazy="false"
              class="image"
              :image="poster.featuredImage"
              sizes="(max-width: 640px) 100vw, (max-width: 1240px) 50vw, 620px"
            />
          </fade-animation>
        </div>
      </div>
    </article>
    <div class="meta-data">
      <dl class="definition-list">
        <template v-if="poster.date">
          <dt class="definition-title">Publicatiedatum</dt>
          <dd class="definition-item">
            <app-date :date="poster.date" />
          </dd>
        </template>
        <template v-if="poster.subjects.length">
          <dt class="definition-title">Onderwerpen:</dt>
          <dd class="definition-item">
            <poster-tags-list :list="poster.subjects" class="tags-list" />
          </dd>
        </template>

        <template v-if="poster.sources.length">
          <dt class="definition-title">Bronnen:</dt>
          <dd class="definition-item">
            <poster-tags-list :list="poster.sources" class="tags-list" />
          </dd>
        </template>
      </dl>
      <div class="buttons">
        <poster-favorites :poster="poster" />
        <app-button
          v-if="poster.pdf"
          :is-primary="false"
          :to="poster.pdf"
          external
          download
        >
          <app-icon icon="pdf" :width="32" :height="32" class="icon" />
          Download
        </app-button>
      </div>
      <div class="social-media">
        <share-this
          v-if="poster.featuredImage"
          :title="poster.title"
          :image="poster.featuredImage.src"
        />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "~/assets/css/media-queries/media-queries.css";

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

.image:deep(img) {
  width: 100%;
}
</style>
