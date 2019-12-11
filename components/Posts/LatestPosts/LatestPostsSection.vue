<template>
  <section
    v-if="posts.edges.length"
    :class="$style['latest-posts']"
    aria-labelledby="latest-posts-title"
  >
    <center-wrapper :class="$style.wrapper" size="lg">
      <h1 id="latest-posts-title">{{ $t('title') }}</h1>
      <posts-list :posts="posts.edges" />
      <app-button to="/over-mij/nieuws">{{ $t('btnMore') }}</app-button>
      <balloon />
    </center-wrapper>
  </section>
</template>

<script>
import AppButton from '@/components/Shared/AppButton.vue'
import Balloon from '@/components/Illustrations/Balloon.vue'
import PostsList from '@/components/Posts/PostsList.vue'
import CenterWrapper from '@/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    Balloon,
    AppButton,
    PostsList,
    CenterWrapper
  },

  props: {
    posts: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="postcss" module>
.latest-posts {
  @mixin block;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
}

.wrapper {
  position: relative;
}
</style>

<i18n>
{
  "nl": {
    "title": "Nieuws",
    "btnMore": "Meer nieuwsartikelen"
  }
}
</i18n>
