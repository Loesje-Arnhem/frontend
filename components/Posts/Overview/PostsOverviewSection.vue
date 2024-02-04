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

const { pending } = useFetch('/api/posts/posts', {
  query: {
    exclude: props.exclude.toString(),
    page,
  },
  transform(response) {
    hasNextPage.value = response.hasNextPage
    posts.value = [...posts.value, ...response.items]
  },
})

const loadMore = () => {
  page.value = page.value + 1
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
        <load-more-by-click :loading="pending" @load-more="loadMore" />
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
