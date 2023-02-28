<template>
  <list-animation v-if="posts.length" :class="$style.list">
    <post-list-item
      v-for="post in posts"
      :key="post.node.id"
      :post="post.node"
      :class="$style['list-item']"
    />
  </list-animation>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IRelatedPostNode } from '~/interfaces/IPost'

export default defineComponent({
  props: {
    posts: {
      type: Array as PropType<IRelatedPostNode[]>,
      default: () => [],
    },
  },
})
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

<!-- <i18n>
{
  "nl": {
    "title": "Nieuws",
    "btnMore": "Meer nieuwsartikelen"
  }
}
<i18n> -->
