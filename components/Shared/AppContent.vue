<template>
  <center-wrapper :size="hasMedia ? 'lg' : 'md'">
    <div class="content-wrapper">
      <article :class="{ 'has-media': hasMedia }">
        <div class="content">
          <h1>{{ title }}</h1>
          <post-date v-if="date" :date="date" class="date" />
          <div class="text" v-html="content" />
        </div>
        <div class="media">
          <app-video v-if="video" :video="video" />
          <photo-frame v-else-if="image" :image="image" />
        </div>
      </article>
    </div>
  </center-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import { IFeaturedImage } from '~/interfaces/IMedia'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: Object as PropType<IFeaturedImage>,
      default: () => {},
    },
    video: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const hasMedia = computed(() => {
      return props.video !== null || props.image?.node
    })

    return {
      hasMedia,
    }
  },
})
</script>

<style lang="postcss" scoped>
.content-wrapper {
  @mixin block;

  @media print {
    padding: 0;
  }
}

.content {
  display: flex;
  flex-direction: column;
}

.has-media {
  align-items: start;
  display: grid;
  grid-gap: calc(var(--gutter) * 2);

  @media (--viewport-lg) {
    grid-template-columns: auto 22em;
  }
}

.date {
  order: -1;
}

.media {
  max-width: 20em;
  width: 100%;
  margin: 1em auto;
  @media (--viewport-lg) {
    margin-block: 2em;
  }
}
</style>
