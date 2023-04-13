<script lang="ts" setup>
import { RelatedPageNodeFragment } from '#gql';

defineProps<{
  page: RelatedPageNodeFragment
}>()
</script>

<template>
  <clickable-list-item
    v-if="page.node.uri"
    :url="page.node.uri"
    :class="$style['related-page']"
    class="box"
  >
    <h2 :class="$style.title">
      <nuxt-link
        :to="page.node.uri"
        :class="$style.link"
      >
        {{ page.node.title }}
      </nuxt-link>
    </h2>
    <div :class="$style.text">
      <div v-html="page.node.excerpt" />
      <read-more-link :to="page.node.uri" />
    </div>
  </clickable-list-item>
</template>

<style lang="postcss" module>
.title {
  @mixin color-negative;

  padding: 0.5rem 1rem;
  margin-bottom: 0;
}

.text {
  padding: 1rem;
}

.link {
  @mixin link-reset;
}
</style>
