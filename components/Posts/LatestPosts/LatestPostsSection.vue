<template>
  <section :class="$style['latest-posts']" aria-labelledby="latest-posts-title">
    <center-wrapper size="lg">
      <div :class="$style.wrapper">
        <div class="latest-posts">
          <h1 id="latest-posts-title">{{ $t('title') }}</h1>
          <app-loader v-if="isLoading" />
          <template v-if="hasData">
            <latest-posts-list :posts="data.posts.edges" :class="$style.list" />
            <balloon />
          </template>
          <app-button to="/over-mij/nieuws/">{{ $t('btnMore') }}</app-button>
        </div>
        <become-member />
      </div>
    </center-wrapper>
  </section>
</template>

<script>
import AppButton from '@/components/Shared/AppButton.vue'
import Balloon from '@/components/Posts/LatestPosts/LatestPostBalloon.vue'
import LatestPostsList from '@/components/Posts/LatestPosts/LatestPostsList.vue'
import CenterWrapper from '@/components/Wrappers/CenterWrapper.vue'
import AppLoader from '@/components/Shared/AppLoader.vue'
import BecomeMember from '@/components/BecomeMember/BecomeMember.vue'

export default {
  components: {
    Balloon,
    AppButton,
    LatestPostsList,
    CenterWrapper,
    AppLoader,
    BecomeMember
  },

  props: {
    data: {
      type: Object,
      default: () => {}
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasData() {
      return !this.isLoading && this.data
    }
  }
}
</script>

<style lang="postcss" module>
.latest-posts {
  @mixin block;
}

.wrapper {
  position: relative;

  @media (--viewport-lg) {
    display: grid;
    align-items: start;
    grid-gap: 2em;
    grid-template-columns: 2fr 1fr;
  }
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
