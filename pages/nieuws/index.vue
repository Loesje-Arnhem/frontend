<template>
  <div>
    <div class="page">
      <h1>{{ title }}</h1>
    </div>
    <latest-posts />
  </div>
</template>

<script>
import LatestPosts from '@/components/LatestPosts.vue'

export default {
  components: {
    LatestPosts
  },
  data() {
    return {
      title: 'Nieuws'
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style scoped lang="postcss">
.page {
  @mixin center;
}
</style>
