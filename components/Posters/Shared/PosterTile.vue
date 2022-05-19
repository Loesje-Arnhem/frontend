<template>
  <div
    v-if="image"
    :class="$style.tile"
    class="tile"
    :style="{
      'page-transition-tag': transitionTag,
    }"
  >
    <button :class="$style.link" @click="goToDetails">
      <img
        :alt="poster.title"
        :src="image"
        :class="$style.poster"
        width="200"
        height="500"
      />
    </button>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  useRouter,
  nextTick,
} from '@nuxtjs/composition-api'
import { IRelatedPoster } from '~/interfaces/IPoster'

export default defineComponent({
  props: {
    poster: {
      type: Object as PropType<IRelatedPoster>,
      default: () => {},
    },
  },
  setup(props) {
    const transitionTag = ref('none')
    const router = useRouter()
    const image = computed(() => {
      return props.poster.featuredImage?.node.medium
    })

    const goToDetails = () => {
      transitionTag.value = 'embed-container'

      if (
        // @ts-ignore-next-line
        document.createDocumentTransition
      ) {
        nextTick(() => {
          router.push(props.poster.uri)
        })
      } else {
        router.push(props.poster.uri)
      }
    }
    return {
      transitionTag,
      goToDetails,
      image,
    }
  },
})
</script>

<style lang="postcss" module>
.tile {
  contain: paint;
}

.poster {
  display: block;
  width: 100%;
}

.link {
  width: 100%;
  display: block;

  &:focus {
    outline-offset: 3px;
    outline-width: 1px;
  }
}
</style>
