<template>
  <center-wrapper>
    <div :class="$style.wrapper">
      <article :class="{ [$style['has-media']]: hasMedia }">
        <div :class="$style.content">
          <h1>{{ title }}</h1>
          <post-date v-if="date" :date="date" :class="$style.date" />
          <div class="text" v-html="content" />
        </div>
        <div :class="$style.media">
          <app-video v-if="video" :video="video" :class="$style.video" />
          <photo-frame
            v-else-if="image"
            :image="image.node.image"
            :class="$style.image"
          />
        </div>
      </article>
    </div>
  </center-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
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
      return props.video !== null || props.image !== null
    })
    return {
      hasMedia,
    }
  },
})
</script>

<style lang="postcss" module>
.wrapper {
  @mixin block;
}

.content {
  display: flex;
  flex-direction: column;
  max-width: var(--container-width-md);
  margin: 0 auto;
}

.has-media {
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
  margin-top: 4em;
}
</style>
