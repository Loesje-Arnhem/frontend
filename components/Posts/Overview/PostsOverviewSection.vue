<script lang="ts" setup>
import type { IPostListItem } from '~/types/Content'

const props = withDefaults(
  defineProps<{
    exclude?: number
  }>(),
  {
    exclude: 0,
  },
)

const page = ref(1)
const posts = ref<IPostListItem[]>([])
const hasNextPage = ref(false)
const isLoading = ref(false)

const fetchPosts = async () => {
  isLoading.value = true
  const response = await $fetch('/api/posts/posts', {
    query: {
      exclude: props.exclude,
      page: page.value,
    },
  })
  posts.value = [...posts.value, ...response.items]
  hasNextPage.value = response.hasNextPage
  isLoading.value = false
}
await fetchPosts()

const loadMore = async () => {
  page.value = page.value + 1
  await fetchPosts()
}
</script>

<template>
  <section
    v-if="posts.length"
    class="posts-overview"
    aria-labelledby="posts-overview-title"
  >
    <center-wrapper size="md">
      <h1 id="posts-overview-title">
        <template v-if="exclude">
          {{ $t('otherNews') }}
        </template>
        <template v-else>
          {{ $t('posts') }}
        </template>
      </h1>
      <posts-overview-list :posts="posts" />
      <center-wrapper v-if="hasNextPage">
        <load-more-by-click :loading="isLoading" @load-more="loadMore" />
      </center-wrapper>
    </center-wrapper>
  </section>
</template>

<style lang="postcss" scoped>
.posts-overview {
  @mixin block;
}

.button-wrapper {
  display: flex;
  justify-content: center;
}
</style>
