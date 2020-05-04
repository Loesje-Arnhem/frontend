<template>
  <center-wrapper :class="$style.wrapper" size="md">
    <article :class="$style.post">
      <h1>{{ post.title }}</h1>
      <post-date :date="post.date" :class="$style.date" />
      <!-- eslint-disable-next-line -->
      <div class="text" v-html="post.content" />
    </article>
  </center-wrapper>
</template>

<script>
import PostDate from '@/components/Posts/Shared/PostDate.vue'
import CenterWrapper from '@/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    PostDate,
    CenterWrapper,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="postcss" module>
.post {
  @mixin block;

  display: flex;
  flex-direction: column;
}
</style>
