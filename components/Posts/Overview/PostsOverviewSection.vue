<template>
  <section
    :class="$style['posts-overview']"
    aria-labelledby="posts-overview-title"
  >
    <center-wrapper>
      <h1 id="posts-overview-title">{{ title }}</h1>
      <posts-container
        :not-in="notIn"
        :show-more="true"
        :btn-more-text="$t('btnMore')"
      >
        <template v-slot="data">
          <posts-overview-list :posts="data.posts" />
        </template>
      </posts-container>
    </center-wrapper>
  </section>
</template>

<script>
import PostsOverviewList from '~/components/Posts/Overview/PostsOverviewList.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import PostsContainer from '~/components/Posts/Data/PostsContainer.vue'

export default {
  components: {
    PostsOverviewList,
    CenterWrapper,
    PostsContainer,
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
