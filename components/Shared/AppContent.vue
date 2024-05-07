<script lang="ts" setup>
import type { FeaturedImage } from '~/types/Content'

const props = defineProps<{
  title: string
  image?: FeaturedImage
  video?: string
  content?: string
  date?: string
}>()

const hasMedia = computed(() => {
  return props.video || props.image
})
</script>

<template>
  <center-wrapper :size="hasMedia ? 'lg' : 'md'">
    <div class="content-wrapper">
      <article :class="{ 'has-media': hasMedia }">
        <div class="content">
          <h1 v-html="title" />
          <post-date
            v-if="date"
            :date="date"
            class="date"
          />
          <div
            class="text"
            v-html="content"
          />
        </div>
        <div class="media">
          <app-video
            v-if="video"
            :video="video"
          />
          <photo-frame
            v-else-if="image"
            :image="image"
          />
        </div>
      </article>
    </div>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.content-wrapper {
  @media print {
    padding: 0;
  }
}

.content {
  display: flex;
  flex-direction: column;
}

.has-media {
  align-items: start;
  display: grid;
  grid-gap: calc(var(--gutter) * 2);

  @media (--viewport-lg) {
    grid-template-columns: auto 22em;
  }
}

.date {
  order: -1;
}

.media {
  max-width: 20em;
  width: 100%;
  margin: 1em auto;
  @media (--viewport-lg) {
    margin-block: 2em;
  }
}
</style>
