<script lang="ts" setup>
import { IRelatedPage } from '~~/interfaces/IContent'

defineProps<{
  page: IRelatedPage
}>()
</script>

<template>
  <clickable-list-item
    v-if="page.uri"
    :url="page.uri"
    :class="$style['related-page']"
    class="box"
  >
    <h2 :class="$style.title">
      <nuxt-link :to="page.uri" :class="$style.link">
        {{ page.title }}
      </nuxt-link>
    </h2>
    <div :class="$style.text">
      <div v-html="page.excerpt" />
      <read-more-link :to="page.uri" />
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
