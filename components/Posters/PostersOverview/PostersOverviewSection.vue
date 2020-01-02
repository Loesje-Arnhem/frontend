<template>
  <section aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1 id="posters-overview-title">
        {{ $t('title') }}
      </h1>
      <posters-overview-container :not-in="notIn" />
    </center-wrapper>
  </section>
</template>

<script>
import CenterWrapper from '@/components/Wrappers/CenterWrapper.vue'
import PostersOverviewContainer from '@/components/Posters/PostersOverview/PostersOverviewContainer.vue'

export default {
  components: {
    CenterWrapper,
    PostersOverviewContainer
  },
  props: {
    notIn: {
      type: Number,
      default: 0
    }
  }
}
</script>

<i18n>
{
  "nl": {
    "title": "Posters"
  }
}
</i18n>
