<script lang="ts" setup>
import type { IRelatedPage } from "~/types/Content";

defineProps<{
  page: IRelatedPage;
}>();
</script>

<template>
  <clickable-list-item v-if="page.uri" :to="page.uri" class="related-page box">
    <h2 class="title">
      <nuxt-link :to="page.uri" class="link">
        {{ page.title }}
      </nuxt-link>
    </h2>
    <div class="text">
      <div v-html="page.excerpt" />
      <read-more-link :to="page.uri" />
    </div>
  </clickable-list-item>
</template>

<style lang="postcss" scoped>
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
