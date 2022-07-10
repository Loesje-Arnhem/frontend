<template>
  <div class="poster-details">
    <article class="content">
      <h1 class="sr-only">{{ poster.title }}</h1>

      <div class="tile image-wrapper-details" :data-slug="poster.slug">
        <fade-animation>
          <app-image
            v-if="poster.featuredImage"
            :key="poster.featuredImage.node.large"
            :alt="poster.title"
            :src="poster.featuredImage.node.large"
            cclass="image"
          />
        </fade-animation>
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
          button-tag="a"
          :href="poster.PosterMetaGroup.pdf.mediaItemUrl"
          :download="poster.slug"
        >
          <app-icon icon="pdf" width="32" height="32" class="icon" />
          Download
        </app-button>
      </div>
      <div class="social-media">
        <share-this :title="poster.title" :link="poster.link" :image="image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { IPoster } from '~/interfaces/IPoster'

export default defineComponent({
  props: {
    poster: {
      type: Object as PropType<IPoster>,
      required: true,
    },
  },
  setup(props) {
    const image = computed(() => {
      if (props.poster.featuredImage?.node.large) {
        return props.poster.featuredImage?.node.large
      }
      return null
    })
    return {
      image,
    }
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
