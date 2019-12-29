<template>
  <div>
    <list-animation v-if="posters.length" :class="$style.list">
      <posters-overview-list-item
        v-for="poster in posters"
        :key="poster.node.id"
        :poster="poster"
        :class="$style['list-item']"
      />
    </list-animation>
    <div v-if="hasMore" :class="$style['button-wrapper']">
      <app-button @click="$emit('loadMore')">
        {{ $t('btnMore') }}
      </app-button>
    </div>
  </div>
</template>

<script>
import PostersOverviewListItem from '@/components/Posters/PostersOverview/PostersOverviewListItem.vue'
import ListAnimation from '@/components/Animations/ListAnimation.vue'
import AppButton from '@/components/Shared/AppButton.vue'

export default {
  components: {
    PostersOverviewListItem,
    ListAnimation,
    AppButton
  },
  props: {
    posters: {
      type: Array,
      required: true
    },
    hasMore: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="postcss" module>
.list {
  @mixin list-reset;
  background: url('/images/backgrounds/wall.jpg');
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
}

.button-wrapper {
  text-align: center;
}
</style>

<i18n>
{
  "nl": {
    "btnMore": "Bekijk meer posters"
  }
}
</i18n>
