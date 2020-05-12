<template>
  <clickable-list-item :url="page.uri" :class="$style['related-page']">
    <h2 :class="$style.title">
      <nuxt-link :to="page.uri">{{ page.title }}</nuxt-link>
    </h2>
    <div :class="$style.text">
      <!-- eslint-disable-next-line -->
    <div v-html="page.excerpt" />
      <read-more-link />
    </div>
  </clickable-list-item>
</template>

<script>
import ReadMoreLink from '~/components/Shared/ReadMoreLink.vue'
import ClickableListItem from '~/components/Shared/ClickableListItem.vue'

export default {
  components: {
    ClickableListItem,
    ReadMoreLink,
  },
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="postcss" module>
.related-page {
  --rough-stroke-width: 3px;
  --rough-roughness: 2.5;

  border: var(--rough-stroke-width) solid var(--rough-stroke);

  @supports (border-image-source: paint(rough-boxes)) {
    border-image-source: paint(rough-boxes);
    border-image-slice: 10 fill;
    border-image-outset: 0;
  }
}

.title {
  @mixin color-negative;

  padding: 0.5rem 1rem;
  margin-bottom: 0;
}

.text {
  padding: 1rem 1rem;
}
</style>
