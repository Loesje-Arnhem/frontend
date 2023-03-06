<script lang="ts" setup>
import { getRelatedPosts } from '~/graphql/Posts/Posts'
import { IPosts } from '~/interfaces/IPost'

const props = withDefaults(
  defineProps<{
    notIn: number
  }>(),
  {
    notIn: 0,
  },
)

const { result, fetchMore, loading } = useQuery<{
  posts: IPosts
}>(getRelatedPosts, {
  notIn: props.notIn,
})

const loadMore = () => {
  fetchMore({
    variables: {
      after: result.value?.posts.pageInfo.endCursor,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult
      return {
        ...fetchMoreResult,
        posts: {
          ...fetchMoreResult.posts,
          pageInfo: fetchMoreResult.posts.pageInfo,
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
    :class="$style['posts-overview']"
    aria-labelledby="posts-overview-title"
  >
    <center-wrapper size="md">
      <h1 id="posts-overview-title">
        <template v-if="notIn">{{ $t('otherNews') }}</template>
        <template v-else>{{ $t('posts') }}</template>
      </h1>
      <app-loader v-if="!result && loading" />
      <template v-else-if="result">
        <posts-overview-list
          v-if="result.posts.edges.length"
          :posts="result.posts.edges"
        />
        <load-more-by-click
          v-if="result.posts.pageInfo.hasNextPage"
          :loading="loading"
          :title="$t('showMorePosts')"
          @load-more="loadMore"
        />
      </template>
    </center-wrapper>
  </section>
</template>

<style lang="postcss" module>
.posts-overview {
  @mixin block;
}

.button-wrapper {
  display: flex;
  justify-content: center;
}
</style>
