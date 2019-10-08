<template>
  <clickable-list-item class="list-item" :url="url">
    <h2 class="title">
      <!-- eslint-disable-next-line -->
      <router-link :to="url" v-html="post.title" />
    </h2>
    <post-date :date="post.date" />
    <!-- eslint-disable-next-line -->
    <div class="text" v-html="post.excerpt" />
    <div class="link-wrapper">
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
      return `/over-mij/nieuws/${this.post.slug}`
    }
  }
}
</script>

<style lang="postcss" scoped>
.list-item {
  &:not(:last-child) {
    margin: 0 0 3em;
  }
}

.title {
  margin-bottom: 0;
}

time {
  font-size: 0.9em;
  color: var(--color-gray-dark);
}

.link-wrapper {
  margin-top: auto;
}
</style>
