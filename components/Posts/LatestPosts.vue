<template>
  <section :class="$style['news-list']" aria-labelledby="news-list-title">
    <center-wrapper :class="$style.wrapper" size="lg">
      <h1 id="news-list-title">{{ $t('title') }}</h1>
      <posts-list :total="3" :class="$style.list" :has-paging="false" />
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

  computed: {
    hasPosts() {
      return this.posts && this.posts.edges && this.posts.edges.length
    }
  }
}
</script>

<style lang="postcss" module>
.news-list {
  @mixin block;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
}

.wrapper {
  position: relative;
}

.list {
  @mixin list-reset;
  margin-bottom: 2em;
  max-width: 42rem;
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
