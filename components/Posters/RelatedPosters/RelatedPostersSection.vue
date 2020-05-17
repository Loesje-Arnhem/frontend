<template>
  <section
    :class="$style['related-posters']"
    aria-labelledby="related-posters-title"
  >
    <center-wrapper>
      <h1 id="related-posters-title" :class="$style.title">
        {{ title }}
      </h1>
    </center-wrapper>
    <center-wrapper size="full">
      <posters-container
        :subjects="subjects"
        :poster-ids="posterIds"
        :search="relatedPosters.search"
        :first="5"
      >
        <template v-slot="data">
          a{{ data.poster }}
          <related-posters-list v-if="data" :posters="data.posters" />
        </template>
      </posters-container>
    </center-wrapper>
    <center-wrapper :class="$style['btn-wrapper']">
      <app-button to="/posters">{{ btnText }}</app-button>
    </center-wrapper>
  </section>
</template>

<script>
import PostersContainer from '~/components/Posters/Data/PostersContainer.vue'
import AppButton from '~/components/Shared/AppButton.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import RelatedPostersList from '~/components/Posters/RelatedPosters/RelatedPostersList.vue'

export default {
  components: {
    PostersContainer,
    AppButton,
    CenterWrapper,
    RelatedPostersList,
  },
  props: {
    relatedPosters: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    title() {
      return this.relatedPosters.title || this.$t('title')
    },
    btnText() {
      let text = this.$t('btnText')
      if (this.relatedPosters.subjects.length === 1) {
        const { name } = this.relatedPosters.subjects[0]
        text += this.$t('aboutSubject', { subject: name })
      }
      return text
    },
    subjects() {
      return this.relatedPosters.subjects.map((subject) => subject.databaseId)
    },
    posterIds() {
      if (this.relatedPosters.posters) {
        return this.relatedPosters.posters.map(
          (poster) => poster.poster.databaseId,
        )
      }
      return []
    },
  },
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
    "btnText": "Bekijk alle posters",
    "aboutSubject": " over {subject}"
  }
}
</i18n>
