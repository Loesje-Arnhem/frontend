<script lang="ts" setup>
import { GetPosts } from '~/graphql2/posts'

const props = withDefaults(
  defineProps<{
    exclude?: number
  }>(),
  {
    exclude: 0,
  },
)

const { result, loading, fetchMore } = useQuery(GetPosts, {
  notIn: props.exclude.toString(),
})

const loadMore = async () => {
  await fetchMore({
    variables: {
      after: result.value?.posts?.pageInfo.endCursor,
    },

    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!previousResult?.posts?.edges.length) return previousResult
      if (!fetchMoreResult?.posts?.edges.length) return previousResult
      return {
        ...fetchMoreResult,
        posts: {
          ...fetchMoreResult.posts,
          edges: [
            ...previousResult.posts.edges,
            ...fetchMoreResult.posts.edges,
          ],
        },
      }
    },
  })
}
</script>

<template>
  <section
    v-if="result?.posts"
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
      <posts-overview-list :posts="result.posts" />
      <center-wrapper>
        <load-more-by-click
          v-if="result.posts.pageInfo.hasNextPage"
          :loading="loading"
          @load-more="loadMore"
        />
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
