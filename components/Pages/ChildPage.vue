<template>
  <clickable-list-item :url="url">
    <h2 class="title">
      <nuxt-link :to="url">{{ page.node.title }}</nuxt-link>
    </h2>
    <!-- eslint-disable-next-line -->
    <div v-html="page.node.excerpt" />
    <ReadMoreLink />
  </clickable-list-item>
</template>

<script>
import ReadMoreLink from '@/components/Shared/ReadMoreLink.vue'
import ClickableListItem from '@/components/shared/ClickableListItem.vue'

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

<style lang="postcss" scoped>
.list-item {
  &:hover .read-more,
  &:focus-within .read-more {
    box-shadow: 0 3px 0 0 var(--color-black);
    & >>> .icon {
      margin-left: 0.25em;
    }
  }
}

.title {
  margin-bottom: 0;
}

a {
  @mixin link-reset;
}
</style>
