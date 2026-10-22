<script lang="ts" setup>
import type { IPoster } from '~/types/Content'

const props = defineProps<{
  poster: IPoster
}>()

const transitionName = computed(() => `image-${props.poster.id}`)
</script>

<template>
  <div class="poster-details">
    <article class="content">
      <h1 class="sr-only">
        {{ poster.title }}
      </h1>
      <div class="tile-wrapper">
        <div
          class="tile image-wrapper-details"
          :data-slug="poster.slug"
        >
          <fade-animation>
            <div
              :key="poster.id"
              class="image-wrapper"
            >
              <app-image
                v-if="poster.featuredImage"
                :lazy="true"
                class="placeholder"
                v-bind="poster.featuredImage"
                alt=""
                sizes="50vw md:33vw lg:250px"
              />
              <app-image
                v-if="poster.featuredImage"
                :key="poster.id"
                :lazy="false"
                class="image"
                v-bind="poster.featuredImage"
                sizes="100vw md:50vw xl:620px"
              />
            </div>
          </fade-animation>
        </div>
      </div>
    </article>
    <div class="meta-data">
      <dl class="definition-list">
        <template v-if="poster.date">
          <dt class="definition-title">
            Publicatiedatum
          </dt>
          <dd class="definition-item">
            <app-date :date="poster.date" />
          </dd>
        </template>
        <template v-if="poster.subjects.length">
          <dt class="definition-title">
            Onderwerpen:
          </dt>
          <dd class="definition-item">
            <poster-tags-list
              :list="poster.subjects"
              class="tags-list"
            />
          </dd>
        </template>

        <template v-if="poster.sources.length">
          <dt class="definition-title">
            Bronnen:
          </dt>
          <dd class="definition-item">
            <poster-tags-list
              :list="poster.sources"
              class="tags-list"
            />
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
          <app-icon
            icon="pdf"
            :width="32"
            :height="32"
            class="icon"
          />
          Download
        </app-button>
        <app-button
          :is-primary="false"
          to="https://payment-links.mollie.com/nl/payment/odjSsKYZaKW9FcxkgciUR/details"
          external
        >
          <app-icon
            icon="gift"
            :width="32"
            :height="32"
            class="icon"
          />
          Doneer nu
        </app-button>
      </div>
      <p />
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

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.poster-details {
  display: grid;
  gap: 1em;
  margin-block-end: 2em;

  @media (--viewport-sm) {
    grid-template-columns: 1fr 1fr;
  }

  @media print {
    grid-template-columns: 1fr;
  }
}

.content {
  @media print {
    inline-size: 95%;
    margin: 0 auto;
  }
}

.meta-data {
  display: flex;
  flex-direction: column;

  @mixin hide-for-print;
}

.definition-title {
  padding-block-start: 0;
  font-weight: var(--font-weight-bold);
}

.definition-list {
  margin: 0 0 1.5em;
}

.definition-item {
  margin-block-end: 0.5em;
  margin-inline-start: 0;
}

.tags-list {
  margin-block-end: 0;
}

.social-media {
  margin-block-start: auto;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-block-end: 1.5em;
}

.icon {
  inline-size: 1em;
  block-size: 1em;
}

.tile-wrapper {
  background: var(--color-white);
  view-transition-name: v-bind(transitionName);
}

.tile {
  padding: 3px;
}

.image,
.image-wrapper {
  position: relative;
}

.image:deep(img) {
  inline-size: 100%;
}

.placeholder {
  position: absolute;
  inset: 0;
}
</style>
