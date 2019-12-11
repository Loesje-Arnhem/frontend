<template>
  <section :class="$style['latest-posts']" aria-labelledby="latest-posts-title">
    <center-wrapper size="lg">
      <div :class="$style.wrapper">
        <h1 id="latest-posts-title">{{ $t('title') }}</h1>
        <app-loader v-if="isLoading" />
        <latest-posts-list
          v-if="hasData"
          :posts="data.posts.edges"
          :class="$style.list"
        />
        <app-button to="/over-mij/nieuws/">{{ $t('btnMore') }}</app-button>
        <balloon />
      </div>
    </center-wrapper>
  </section>
</template>

<script>
import AppButton from '@/components/Shared/AppButton.vue'
import Balloon from '@/components/Illustrations/Balloon.vue'
import LatestPostsList from '@/components/Posts/LatestPosts/LatestPostsList.vue'
import CenterWrapper from '@/components/Wrappers/CenterWrapper.vue'
import AppLoader from '@/components/Shared/AppLoader.vue'

export default {
  components: {
    Balloon,
    AppButton,
    LatestPostsList,
    CenterWrapper,
    AppLoader
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
    padding-right: 20em;
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
