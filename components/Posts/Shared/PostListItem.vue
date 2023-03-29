<script lang="ts" setup>
import { IPostListItem } from '~/interfaces/IContent'

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
  <clickable-list-item :url="url" class="list-item">
    <h2 class="title">
      <nuxt-link :to="url" class="link">
        {{ post.title }}
      </nuxt-link>
    </h2>
    <post-date :date="post.date" class="date" />
    <div class="text" v-html="post.excerpt" />
    <div class="link-wrapper" aria-hidden="true">
      <read-more-link class="read-more" :to="url" />
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
