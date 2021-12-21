<template>
  <section
    :class="$style['posts-overview']"
    aria-labelledby="posts-overview-title"
  >
    <center-wrapper size="md">
      <h1 id="posts-overview-title">{{ title }}</h1>
      <posts-overview-list
        v-if="posts && posts.edges.length"
        :posts="posts.edges"
      />
      <load-more-by-click
        v-if="hasNextPage"
        :loading="loading"
        :title="$t('btnMore')"
        @load-more="loadMore"
      />
    </center-wrapper>
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import usePosts from '~/composables/posts'

export default defineComponent({
  props: {
    notIn: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { notIn } = props
    const { posts, loading, loadMore, hasNextPage } = usePosts({
      notIn,
    })

    return {
      posts,
      loading,
      loadMore,
      hasNextPage,
    }
  },
  computed: {
    title() {
      if (this.notIn) {
        return this.$t('relatedTitle')
      }
      return this.$t('title')
    },
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
