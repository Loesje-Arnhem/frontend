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
  </div>
</template>

<script>
import PostersOverviewListItem from '@/components/Posters/PostersOverview/PostersOverviewListItem.vue'
import ListAnimation from '@/components/Animations/ListAnimation.vue'

export default {
  components: {
    PostersOverviewListItem,
    ListAnimation
  },
  props: {
    posters: {
      type: Array,
      required: true
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
