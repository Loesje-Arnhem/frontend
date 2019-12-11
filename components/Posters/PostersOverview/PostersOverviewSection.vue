<template>
  <section :class="$style.posters" aria-labelledby="posters-overview-title">
    <center-wrapper :class="$style.wrapper">
      <input v-model="search" type="search" />
      <app-button @click="$emit('search', search)">
        {{ $t('btnMore') }}
      </app-button>
      <h1 id="posters-overview-title" :class="$style.title">
        {{ $t('title') }}
      </h1>
      <posters-overview-list v-if="data" :posters="data.posters.edges" />
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
import CenterWrapper from '@/components/Wrappers/CenterWrapper.vue'
import AppLoader from '@/components/Shared/AppLoader.vue'
import AppButton from '@/components/Shared/AppButton.vue'
import PostersOverviewList from '@/components/Posters/PostersOverview/PostersOverviewList.vue'

export default {
  components: {
    CenterWrapper,
    PostersOverviewList,
    AppButton,
    AppLoader
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    hasMore: {
      type: Boolean,
      default: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isRelated: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    showBtnMore() {
      return !this.isLoading && this.hasMore
    }
  }
}
</script>

<style lang="postcss" module>
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
