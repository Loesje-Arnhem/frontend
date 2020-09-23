<template>
  <section
    :class="$style['posts-overview']"
    aria-labelledby="posts-overview-title"
  >
    <center-wrapper>
      <h1 id="posts-overview-title">{{ title }}</h1>
      <posts-overview-list
        v-if="posts && posts.edges.length"
        :posts="posts.edges"
      />
      <app-loader v-if="loading" />
      <load-more
        v-else-if="posts.pageInfo.hasNextPage"
        :title="$t('btnMore')"
        @loadMore="loadMore"
      />
    </center-wrapper>
  </section>
</template>

<script>
import PostsOverviewList from '~/components/Posts/Overview/PostsOverviewList.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import usePosts from '~/compositions/posts'
import LoadMore from '~/components/LoadMore/LoadMoreByClick.vue'

export default {
  setup(props) {
    const { notIn } = props
    const { posts, loading, error, loadMore } = usePosts({
      notIn,
    })

    return {
      posts,
      loading,
      error,
      loadMore,
    }
  },
  components: {
    PostsOverviewList,
    CenterWrapper,
    LoadMore,
  },
  props: {
    notIn: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    title() {
      if (this.notIn) {
        return this.$t('relatedTitle')
      }
      return this.$t('title')
    },
  },
}
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
