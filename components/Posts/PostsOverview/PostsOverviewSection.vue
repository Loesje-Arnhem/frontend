<template>
  <section
    :class="$style['posts-overview']"
    aria-labelledby="posts-overview-title"
  >
    <center-wrapper>
      <h1 id="posts-overview-title">{{ title }}</h1>
      <posts-overview-list v-if="data" :posts="data.posts.edges" />
      <app-loader v-if="isLoading" />
      <div v-if="showBtnMore" :class="$style['button-wrapper']">
        <app-button @click="$emit('loadMore')">
          {{ $t('btnMore') }}
        </app-button>
      </div>
    </center-wrapper>
  </section>
</template>

<script>
import AppButton from '@/components/Shared/AppButton.vue'
import PostsOverviewList from '@/components/Posts/PostsOverview/PostsOverviewList.vue'
import CenterWrapper from '@/components/Wrappers/CenterWrapper.vue'
import AppLoader from '@/components/Shared/AppLoader.vue'

export default {
  components: {
    AppButton,
    PostsOverviewList,
    CenterWrapper,
    AppLoader,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isRelated: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showBtnMore() {
      return !this.isLoading && this.hasMore
    },
    title() {
      if (this.isRelated) {
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
