<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    exclude?: number
  }>(),
  {
    exclude: 0,
  },
)

const { data, pending } = await useAsyncGql('GetPosts', {
  notIn: props.exclude.toString(),
})

const loadMore = async () => {
  if (!data.value?.posts?.edges.length) {
    return
  }

  pending.value = true
  const result = await GqlGetPosts({
    notIn: props.exclude.toString(),
    after: data.value.posts.pageInfo.endCursor,
  })

  if (!result.posts?.edges.length) {
    return
  }

  data.value = {
    posts: {
      pageInfo: result.posts.pageInfo,
      edges: [...data.value.posts.edges, ...result.posts.edges],
    },
  }
  pending.value = false
}
</script>

<template>
  <section
    v-if="data?.posts"
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
      <posts-overview-list :posts="data.posts" />
      <center-wrapper>
        <load-more-by-click
          v-if="data.posts.pageInfo.hasNextPage"
          :loading="pending"
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
