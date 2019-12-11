<template>
  <section
    :class="$style['related-posters']"
    aria-labelledby="related-posters-title"
  >
    <center-wrapper :class="$style.wrapper" size="full">
      <app-loader v-if="isLoading" />
      <template v-if="hasData">
        <h1 id="related-posters-title" :class="$style.title">
          {{ $t('title') }}
        </h1>
        <related-posters-list :posters="data.posters.edges" />
        <div :class="$style['btn-wrapper']">
          <app-button to="/posters">{{ $t('btnMore') }}</app-button>
        </div>
      </template>
    </center-wrapper>
  </section>
</template>

<script>
import RelatedPostersList from '@/components/Posters/RelatedPosters/RelatedPostersList.vue'
import AppButton from '@/components/Shared/AppButton.vue'
import CenterWrapper from '@/components/Wrappers/CenterWrapper.vue'
import AppLoader from '@/components/Shared/AppLoader.vue'

export default {
  components: {
    RelatedPostersList,
    AppButton,
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
.related-posters {
  padding: 3em 0;
  background: url('/images/backgrounds/wall.jpg');
}

.title {
  text-align: center;
}

.btn-wrapper {
  text-align: right;
}
</style>

<i18n>
{
  "nl": {
    "title": "Posters",
    "btnMore": "Bekijk alle posters"
  }
}
</i18n>
