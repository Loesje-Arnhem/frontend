<template>
  <ul :class="$style.list">
    <post-list-item
      v-for="post in posts"
      :key="post.node.databaseId"
      :post="post.node"
      :class="$style['list-item']"
    />
  </ul>
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
}

.list-item {
  &:not(:last-child) {
    margin: 0 0 2em;
  }
}
</style>
