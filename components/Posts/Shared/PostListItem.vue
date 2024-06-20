<script lang="ts" setup>
import type { IPostListItem } from '~/types/Content'

const localePath = useLocalePath()

const props = defineProps<{
  post: IPostListItem
}>()

const url = computed(() => {
  return localePath({
    name: 'posts-details',
    params: {
      slug: props.post.slug,
    },
  })
})
</script>

<template>
  <clickable-list-item
    :to="url"
    class="list-item"
  >
    <h2 class="title">
      <nuxt-link
        :to="url"
        class="link"
      >
        <span v-html="post.title" />
      </nuxt-link>
    </h2>
    <post-date
      :date="post.date"
      class="date"
    />
    <div
      class="text"
      v-html="post.excerpt"
    />
    <div
      class="link-wrapper"
      aria-hidden="true"
    >
      <read-more-link
        class="read-more"
        :to="url"
      />
    </div>
  </clickable-list-item>
</template>

<style lang="postcss" scoped>
.list-item {
  display: flex;
  flex-direction: column;
}

.title {
  margin-bottom: 0;
}

.link {
  @mixin link-reset;
}

.link-wrapper {
  margin-top: auto;
}

.date {
  order: -1;
}
</style>
