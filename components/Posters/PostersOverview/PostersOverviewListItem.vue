<template>
  <li>
    <poster-tile :poster="poster.node" />
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IPosterNode } from '~/interfaces/IPoster'

export default defineComponent({
  props: {
    poster: {
      type: Object as PropType<IPosterNode>,
      default: () => {},
    },
  },
})
</script>
