<template>
  <section
    v-if="posters.edges.length"
    :class="$style.posters"
    aria-labelledby="posters-title"
  >
    <center-wrapper :class="$style.wrapper" size="full">
      <h1 id="posters-title" :class="$style.title">{{ $t('title') }}</h1>
      <related-posters-list :posters="posters.edges" />
      <div :class="$style['btn-wrapper']">
        <app-button to="/posters">{{ $t('btnMore') }}</app-button>
      </div>
    </center-wrapper>
  </section>
</template>

<script>
import RelatedPostersList from '@/components/Posters/RelatedPosters/RelatedPostersList.vue'
import AppButton from '@/components/Shared/AppButton.vue'
import CenterWrapper from '@/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    RelatedPostersList,
    AppButton,
    CenterWrapper
  },
  props: {
    posters: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="postcss" module>
.posters {
  padding: 3em 0;
  background: url('/images/backgrounds/wall.jpg');
}

.title {
  text-align: center;
}

.btn-wrapper {
  @mixin center;
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
