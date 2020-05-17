<template>
  <section
    :class="$style['posts-overview']"
    aria-labelledby="posts-overview-title"
  >
    <center-wrapper>
      <h1 id="posts-overview-title">{{ title }}</h1>
      <posts-overview-container :not-in="notIn">
        <template v-slot="data">
          <posts-overview-list :posts="data.posts" />
        </template>
      </posts-overview-container>
    </center-wrapper>
  </section>
</template>

<script>
import PostsOverviewList from '~/components/Posts/PostsOverview/PostsOverviewList.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import PostsOverviewContainer from '~/components/Posts/PostsOverview/PostsOverviewContainer.vue'

export default {
  components: {
    PostsOverviewList,
    CenterWrapper,
    PostsOverviewContainer,
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
