<template>
  <section
    v-if="posters.edges.length"
    :class="$style['related-posters']"
    aria-labelledby="related-posters-title"
  >
    <center-wrapper>
      <h1 id="related-posters-title" :class="$style.title">
        {{ $t('title') }}
      </h1>
    </center-wrapper>

    <center-wrapper size="full">
      <related-posters-list :posters="posters.edges" />
    </center-wrapper>
    <center-wrapper :class="$style['btn-wrapper']">
      <app-button :to="localePath({ name: 'posters' })">
        {{ $t('btnText') }}
      </app-button>
    </center-wrapper>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IRelatedPostersBase } from '~/interfaces/IPoster'

export default defineComponent({
  props: {
    posters: {
      type: Object as PropType<IRelatedPostersBase>,
      default: () => {},
    },
  },
  // computed: {
  //   title() {
  //     return this.$t('title')
  //   },
  //   btnText() {
  //     const text = this.$t('btnText')
  //     if (this.posters.subjects?.length === 1) {
  //       const { name } = this.relatedPosters.subjects[0]
  //       text += this.$t('aboutSubject', { subject: name })
  //     }
  //     return text
  //   },
  // },
})
</script>

<style lang="postcss" module>
.related-posters {
  padding: 3em 0;
  background: url('/images/wall.png');
}

.title {
  text-align: center;
}

.btn-wrapper {
  text-align: right;
}
</style>

<!-- <i18n>
{
  "nl": {
    "title": "Posters",
    "btnText": "Bekijk alle posters",
    "aboutSubject": " over {subject}"
  }
}
<i18n> -->
