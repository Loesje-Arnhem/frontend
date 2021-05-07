<template>
  <div :class="$style['poster-details']">
    <article class="content">
      <h1 class="sr-only">{{ poster.title }}</h1>
      <div class="tile">
        <fade-animation mode="out-in">
          <app-image
            v-if="poster.featuredImage"
            :key="poster.featuredImage.node.large"
            :alt="poster.title"
            :src="poster.featuredImage.node.large"
            :class="$style.image"
          />
        </fade-animation>
      </div>
    </article>
    <div :class="$style['meta-data']">
      <dl :class="$style['taxonomy-list']">
        <dt :class="$style['taxonomy-title']">Publicatiedatum</dt>
        <dd :class="$style['taxonomy-item']">
          <app-date :date="poster.PosterMetaGroup.date" />
        </dd>

        <template v-if="poster.subjects.edges.length">
          <dt :class="$style['taxonomy-title']">Onderwerpen:</dt>
          <dd :class="$style['taxonomy-item']">
            <poster-tags-list
              :list="poster.subjects.edges"
              :class="$style['tags-list']"
            />
          </dd>
        </template>

        <template v-if="poster.sources.edges.length">
          <dt :class="$style['taxonomy-title']">Bronnen:</dt>
          <dd :class="$style['taxonomy-item']">
            <poster-tags-list
              :list="poster.sources.edges"
              :class="$style['tags-list']"
            />
          </dd>
        </template>
      </dl>
      <div :class="$style['social-media']">
        <share-this
          :title="poster.title"
          :link="poster.link"
          :image="poster.featuredImage.node.large"
        />
      </div>
      <div :class="$style.buttons">
        <poster-favorites :poster="poster" />
        <app-button
          v-if="poster.PosterMetaGroup.pdf"
          :is-primary="false"
          :href="poster.PosterMetaGroup.pdf.mediaItemUrl"
        >
          <app-icon icon="pdf" width="32" height="32" :class="$style.icon" />
          Download
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    poster: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="postcss" module>
.poster-details {
  display: grid;
  grid-gap: 1em;
  margin-bottom: 2em;

  @media (--viewport-sm) {
    grid-template-columns: 1fr 1fr;
  }
}

.meta-data {
  display: flex;
  flex-direction: column;
}

.taxonomy-title {
  font-weight: var(--font-weight-bold);
  padding-top: 0;
}

.taxonomy-list {
  margin: 0;
}

.taxonomy-item {
  margin-left: 0;
  margin-bottom: 0.5em;
}

.tags-list {
  margin-bottom: 0;
}

.buttons {
  /* border: 2px solid var(--color-black); */
  margin-top: auto;
  background: #000;
  color: #fff;
  padding: 0.5em;
  display: flex;
  gap: 0.5em;

  & :global(.btn-outline) {
    background: var(--color-black);
    color: var(--color-white);
    border-color: var(--color-white);
  }
}

.icon {
  width: 1em;
  height: 1em;
}
</style>
