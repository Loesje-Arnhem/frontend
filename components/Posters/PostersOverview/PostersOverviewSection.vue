<template>
  <section aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1 id="posters-overview-title">
        {{ sectionTitle }}
      </h1>
      <posters-overview-container
        :not-in="notIn"
        :subjects="subjects"
        :sources="sources"
        :search="search"
      />
    </center-wrapper>
  </section>
</template>

<script>
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import PostersOverviewContainer from '~/components/Posters/PostersOverview/PostersOverviewContainer.vue'

export default {
  components: {
    CenterWrapper,
    PostersOverviewContainer,
  },
  props: {
    search: {
      type: String,
      default: null,
    },
    notIn: {
      type: Number,
      default: 0,
    },
    subjects: {
      type: Array,
      default: () => [],
    },
    sources: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    sectionTitle() {
      if (this.title) {
        return this.title
      }
      return this.$t('title')
    },
  },
}
</script>

<i18n>
{
  "nl": {
    "title": "Posters"
  }
}
</i18n>
