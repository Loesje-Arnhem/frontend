<template>
  <div :class="$style['poster-details']">
    <article :class="$style.content">
      <h1 class="sr-only">{{ poster.title }}</h1>
      <div class="tile">
        <fade-animation>
          <nuxt-picture
            v-if="poster.featuredImage"
            :key="poster.featuredImage.node.large"
            :alt="poster.title"
            :src="poster.featuredImage.node.large"
            :class="$style.image"
            width="270"
            height="362"
            preset="base"
            format="avif"
            sizes="sm:80vw md:60vw lg:33vw xl:340 xxl:500"
          />
        </fade-animation>
      </div>
    </article>
    <div :class="$style['meta-data']">
      <dl :class="$style['definition-list']">
        <dt :class="$style['definition-title']">Publicatiedatum</dt>
        <dd :class="$style['definition-item']">
          <app-date :date="poster.PosterMetaGroup.date" />
        </dd>

        <template v-if="poster.subjects.edges.length">
          <dt :class="$style['definition-title']">Onderwerpen:</dt>
          <dd :class="$style['definition-item']">
            <poster-tags-list
              :list="poster.subjects.edges"
              :class="$style['tags-list']"
            />
          </dd>
        </template>

        <template v-if="poster.sources.edges.length">
          <dt :class="$style['definition-title']">Bronnen:</dt>
          <dd :class="$style['definition-item']">
            <poster-tags-list
              :list="poster.sources.edges"
              :class="$style['tags-list']"
            />
          </dd>
        </template>
      </dl>
      <div :class="$style.buttons">
        <poster-favorites :poster="poster" />
        <app-button
          v-if="poster.PosterMetaGroup.pdf"
          :is-primary="false"
          button-tag="a"
          :href="poster.PosterMetaGroup.pdf.mediaItemUrl"
          target="_blank"
        >
          <app-icon icon="pdf" width="32" height="32" :class="$style.icon" />
          Download
        </app-button>
      </div>
      <div :class="$style['social-media']">
        <share-this
          :title="poster.title"
          :link="poster.link"
          :image="poster.featuredImage.node.large"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IPoster } from '~/interfaces/IPoster'

export default defineComponent({
  props: {
    poster: {
      type: Object as PropType<IPoster>,
      required: true,
    },
  },
})
</script>

<style lang="postcss" module>
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
