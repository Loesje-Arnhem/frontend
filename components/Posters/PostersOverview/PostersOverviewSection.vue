<template>
  <section aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1 id="posters-overview-title">
        {{ sectionTitle }}
      </h1>
      <posters-container
        :not-in="notIn"
        :subjects="subjects"
        :sources="sources"
        :search="search"
        :show-more="true"
      >
        <template v-slot="data">
          <posters-overview-list
            v-if="data.posters.length"
            :posters="data.posters"
          />
          <p v-else>Geen gerelateerde posters gevonden</p>
        </template>
      </posters-container>
    </center-wrapper>
  </section>
</template>

<script>
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import PostersContainer from '~/components/Posters/Data/PostersContainer.vue'
import PostersOverviewList from '~/components/Posters/PostersOverview/PostersOverviewList.vue'

export default {
  components: {
    PostersOverviewList,
    CenterWrapper,
    PostersContainer,
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
