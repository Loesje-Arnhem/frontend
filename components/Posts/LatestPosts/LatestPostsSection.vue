<template>
  <section
    if="posts"
    :class="$style['latest-posts']"
    aria-labelledby="latest-posts-title"
  >
    <center-wrapper size="lg">
      <div :class="$style.wrapper">
        <div :class="$style.list">
          <h1 id="latest-posts-title">{{ $t('title') }}</h1>
          <latest-posts-list v-if="posts" :posts="posts.edges" />
          <app-button :to="localePath({ name: 'posts' })">
            {{ $t('btnMore') }}
          </app-button>
        </div>
        <become-member :class="$style['become-member']" />
        <balloon :class="$style.balloon" />
      </div>
    </center-wrapper>
  </section>
</template>

<script>
import Balloon from '~/components/Posts/LatestPosts/LatestPostBalloon.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import LatestPostsList from '~/components/Posts/LatestPosts/LatestPostsList.vue'

export default {
  components: {
    Balloon,
    CenterWrapper,
    LatestPostsList,
  },

  props: {
    posts: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="postcss" module>
.latest-posts {
  @mixin block;
}

.wrapper {
  display: grid;
  align-items: start;
  grid-gap: 2em;
  position: relative;
  grid-template-areas:
    'list'
    'become-member'
    'balloon';

  @media (--viewport-md) {
    grid-template-areas:
      'list list'
      'become-member balloon';
  }
  @media (--viewport-lg) {
    grid-template-areas:
      'list become-member'
      'list balloon';
  }
}

.become-member {
  grid-area: become-member;
}

.balloon {
  grid-area: balloon;
  padding-left: 3em;

  @media (--viewport-md) {
    justify-self: center;
    padding-left: 0;
  }
}

.list {
  grid-area: list;
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
