<template>
  <section :class="$style['latest-posts']" aria-labelledby="latest-posts-title">
    <center-wrapper size="lg">
      <div :class="$style.wrapper">
        <div class="latest-posts">
          <h1 id="latest-posts-title">{{ $t('title') }}</h1>
          <latest-posts-container>
            <template v-slot="data">
              <latest-posts-list v-if="data" :posts="data.posts" />
            </template>
          </latest-posts-container>
          <app-button to="/over-mij/nieuws/">{{ $t('btnMore') }}</app-button>
        </div>
        <become-member />
        <balloon />
      </div>
    </center-wrapper>
  </section>
</template>

<script>
import AppButton from '~/components/Shared/AppButton.vue'
import Balloon from '~/components/Posts/LatestPosts/LatestPostBalloon.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import BecomeMember from '~/components/BecomeMember/BecomeMember.vue'
import LatestPostsList from '~/components/Posts/LatestPosts/LatestPostsList.vue'
import LatestPostsContainer from '~/components/Posts/LatestPosts/LatestPostsContainer.vue'

export default {
  components: {
    Balloon,
    AppButton,
    LatestPostsContainer,
    CenterWrapper,
    BecomeMember,
    LatestPostsList,
  },
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
