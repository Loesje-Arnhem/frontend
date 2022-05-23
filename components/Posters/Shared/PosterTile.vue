<template>
  <div
    v-if="image"
    :class="$style.tile"
    class="tile image-wrapper-tile"
    :data-slug="poster.slug"
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
  useRouter,
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
    const image = computed(() => {
      return props.poster.featuredImage?.node.medium
    })

    const router = useRouter()

    const supportsTransition = computed(() => {
      // @ts-ignore-next-line
      return process.client && document.createDocumentTransition
    })

    const goToDetails = () => {
      if (supportsTransition.value) {
        document.documentElement.classList.add('transition-to-poster-details')
      }
      router.push(props.poster.uri)
    }

    return {
      goToDetails,
      image,
    }
  },
})
</script>

<style lang="postcss" module>
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
