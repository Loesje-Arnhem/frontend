<template>
  <clickable-list-item :url="url" class="list-item">
    <h2 :class="$style.title">
      <!-- eslint-disable-next-line -->
      <router-link :to="url" v-html="post.node.title" />
    </h2>
    <post-date :date="post.node.date" :class="$style.date" />
    <!-- eslint-disable-next-line -->
    <div class="text" v-html="post.node.excerpt" />
    <div :class="$style['link-wrapper']">
      <read-more-link class="read-more" />
    </div>
  </clickable-list-item>
</template>

<script>
import PostDate from '@/components/PostDate.vue'
import ReadMoreLink from '@/components/Shared/ReadMoreLink.vue'
import ClickableListItem from '@/components/Shared/ClickableListItem.vue'

export default {
  components: {
    PostDate,
    ClickableListItem,
    ReadMoreLink
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    url() {
      return `/over-mij/nieuws/${this.post.node.slug}`
    }
  }
}
</script>

<style lang="postcss" module>
.title {
  margin-bottom: 0;
}

.date {
  font-size: 0.9em;
  color: var(--color-gray-dark);
}

.link-wrapper {
  margin-top: auto;
}
</style>
