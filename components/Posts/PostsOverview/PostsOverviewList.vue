<template>
  <list-animation :class="$style.list">
    <post-list-item
      v-for="post in posts"
      :key="post.node.postId"
      :post="post"
      :class="$style['list-item']"
    />
  </list-animation>
</template>

<script>
import PostListItem from '@/components/Posts/Shared/PostListItem.vue'
import ListAnimation from '@/components/Animations/ListAnimation.vue'

export default {
  components: {
    PostListItem,
    ListAnimation
  },

  props: {
    posts: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="postcss" module>
.list {
  @mixin list-reset;
  margin-bottom: 2em;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  align-items: stretch;
}

.list-item {
  padding-bottom: 2em;
  border-bottom: 2px solid var(--color-black);
  display: flex;
  flex-direction: column;
}
</style>

<i18n>
{
  "nl": {
    "title": "Nieuws",
    "btnMore": "Meer nieuwsartikelen"
  }
}
</i18n>
