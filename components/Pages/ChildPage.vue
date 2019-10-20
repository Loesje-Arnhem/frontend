<template>
  <clickable-list-item :url="url">
    <h2 :class="$style.title">
      <nuxt-link :to="url">{{ page.node.title }}</nuxt-link>
    </h2>
    <!-- eslint-disable-next-line -->
    <div v-html="page.node.excerpt" />
    <ReadMoreLink />
  </clickable-list-item>
</template>

<script>
import ReadMoreLink from '@/components/Shared/ReadMoreLink.vue'
import ClickableListItem from '@/components/Shared/ClickableListItem.vue'

export default {
  components: {
    ClickableListItem,
    ReadMoreLink
  },
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  computed: {
    url() {
      return `/${this.page.node.uri}/`
    }
  }
}
</script>

<style lang="postcss" module>
.title {
  margin-bottom: 0;
}
</style>
