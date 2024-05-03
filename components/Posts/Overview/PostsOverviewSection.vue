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

const { pending, data } = useFetch('/api/posts/posts', {
  query: {
    exclude: props.exclude.toString(),
    page,
  },
  transform(response) {
    if (!data.value) {
      return response
    }

    const items: {
      items: IPostListItem[]
      hasNextPage: boolean
    } = {
      items: [...data.value.items, ...response.items],
      hasNextPage: response.hasNextPage,
    }
    return items
  },
})

const loadMore = () => {
  page.value = page.value + 1
}
</script>

<template>
  <section
    v-if="data?.items.length"
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
      <posts-overview-list :posts="data.items" />
      <center-wrapper v-if="data.hasNextPage">
        <load-more-by-click :loading="pending" @load-more="loadMore" />
      </center-wrapper>
    </center-wrapper>
  </section>
</template>

<style lang="postcss" scoped>
.posts-overview {
  padding-bottom: 2em;
}

.button-wrapper {
  display: flex;
  justify-content: center;
}
</style>
