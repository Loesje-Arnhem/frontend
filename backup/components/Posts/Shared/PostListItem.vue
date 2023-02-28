<template>
  <clickable-list-item :url="url" :class="$style['list-item']">
    <h2 :class="$style.title">
      <router-link :to="url" :class="$style.link" v-html="post.title" />
    </h2>
    <post-date :date="post.date" :class="$style.date" />
    <div class="text" v-html="post.excerpt" />
    <div :class="$style['link-wrapper']" aria-hidden="true">
      <read-more-link class="read-more" :to="url" />
    </div>
  </clickable-list-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { IRelatedPost } from '~/interfaces/IPost'
export default defineComponent({
  props: {
    post: {
      type: Object as PropType<IRelatedPost>,
      required: true,
    },
  },
  setup(props) {
    const url = computed(() => {
      return '/over-loesje/nieuws' + props.post.uri
    })
    return {
      url,
    }
  },
})
</script>

<style lang="postcss" module>
.list-item {
  display: flex;
  flex-direction: column;
}

.title {
  margin-bottom: 0;
}

.link {
  @mixin link-reset;
}

.link-wrapper {
  margin-top: auto;
}

.date {
  order: -1;
}
</style>
