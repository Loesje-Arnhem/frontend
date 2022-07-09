<template>
  <list-animation v-if="posters.length" :class="$style.list">
    <posters-overview-list-item
      v-for="poster in posters"
      :key="poster.node.id"
      :poster="poster.node"
      :class="$style['list-item']"
    />
  </list-animation>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IRelatedPoster } from '~/interfaces/IPoster'

export default defineComponent({
  props: {
    posters: {
      type: Array as PropType<IRelatedPoster[]>,
      required: true,
    },
  },
})
</script>

<style lang="postcss" module>
.list {
  @mixin list-reset;

  background: url('/images/wall.jpg');
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);

  @media (--viewport-sm) {
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  }
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
