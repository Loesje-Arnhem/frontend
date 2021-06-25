<template>
  <clickable-list-item
    :url="page.uri"
    :class="$style['related-page']"
    class="box"
  >
    <h2 :class="$style.title">
      <nuxt-link :to="page.uri">{{ page.title }}</nuxt-link>
    </h2>
    <div :class="$style.text">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="page.excerpt" />
      <read-more-link :to="page.uri" />
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
.title {
  @mixin color-negative;

  padding: 0.5rem 1rem;
  margin-bottom: 0;
}

.text {
  padding: 1rem;
}
</style>
