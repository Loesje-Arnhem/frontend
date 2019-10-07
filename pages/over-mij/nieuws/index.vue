<template>
  <div>
    <latest-posts />
  </div>
</template>

<script>
import LatestPosts from '@/components/Blocks/LatestPosts.vue'

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
