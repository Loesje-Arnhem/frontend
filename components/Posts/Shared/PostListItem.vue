<template>
  <clickable-list-item :url="url" :class="$style['list-item']">
    <h2 :class="$style.title">
      <!-- eslint-disable-next-line -->
      <router-link :to="url" v-html="post.node.title" />
    </h2>
    <post-date :date="post.node.date" />
    <!-- eslint-disable-next-line -->
    <div class="text" v-html="post.node.excerpt" />
    <div :class="$style['link-wrapper']" aria-hidden="true">
      <read-more-link class="read-more" :to="url" />
    </div>
  </clickable-list-item>
</template>

<script>
import PostDate from '~/components/Posts/Shared/PostDate.vue'
import ReadMoreLink from '~/components/Shared/ReadMoreLink.vue'
import ClickableListItem from '~/components/Shared/ClickableListItem.vue'

export default {
  components: {
    PostDate,
    ClickableListItem,
    ReadMoreLink,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    url() {
      return '/informatie/nieuws' + this.post.node.uri
    },
  },
}
</script>

<style lang="postcss" module>
.list-item {
  display: flex;
  flex-direction: column;
}

.title {
  margin-bottom: 0;
}

.link-wrapper {
  margin-top: auto;
}
</style>
