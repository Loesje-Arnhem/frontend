<template>
  <section
    v-if="relatedPosts"
    :class="$style['posts-overview']"
    aria-labelledby="posts-overview-title"
  >
    <center-wrapper size="md">
      <h1 id="posts-overview-title">
        <template v-if="notIn">{{ $t('relatedTitle') }}</template>
        <template v-else>{{ $t('title') }}</template>
      </h1>
      <posts-overview-list
        v-if="relatedPosts.edges.length"
        :posts="relatedPosts.edges"
      />
      <load-more-by-click
        v-if="relatedPosts.pageInfo.hasNextPage"
        :loading="loading"
        :title="$t('btnMore')"
        @load-more="loadMore"
      />
    </center-wrapper>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from '@nuxtjs/composition-api'
import { getRelatedPosts } from '~/graphql/Posts/Posts'
import { useFetchMore } from '~/composables/useFetch'
import { IPosts } from '~/interfaces/IPost'

export default defineComponent({
  props: {
    posts: {
      type: Object as PropType<IPosts>,
      default: () => {},
    },
    notIn: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const relatedPosts = ref(props.posts)

    const { fetchMore, loading } = useFetchMore()

    const loadMore = async () => {
      const { posts }: { posts: IPosts } = await fetchMore({
        items: relatedPosts,
        query: getRelatedPosts,
        variables: {
          notIn: props.notIn,
        },
      })

      relatedPosts.value = {
        pageInfo: posts.pageInfo,
        edges: [...relatedPosts.value.edges, ...posts.edges],
      }
    }

    return {
      loadMore,
      loading,
      relatedPosts,
    }
  },
})
</script>

<style lang="postcss" module>
.posts-overview {
  @mixin block;
}

.button-wrapper {
  display: flex;
  justify-content: center;
}
</style>

<i18n>
{
  "nl": {
    "title": "Nieuws",
    "relatedTitle": "Overig nieuws",
    "btnMore": "Toon meer nieuwsartikelen"
  }
}
</i18n>
