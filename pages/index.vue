<template>
  <div>
    <h1 class="sr-only">Home</h1>
    <latest-posts />
    <related-posters />
    <AppStoresBlock />
    <BlockInstagram />
    <groups />
  </div>
</template>

<script>
import LatestPosts from '@/components/Posts/LatestPosts.vue'
import Groups from '@/components/Blocks/Groups.vue'
import BlockInstagram from '@/components/Blocks/BlockInstagram.vue'
import AppStoresBlock from '@/components/Blocks/AppStoresBlock.vue'
import RelatedPosters from '@/components/Posters/RelatedPosters.vue'

export default {
  components: {
    LatestPosts,
    Groups,
    BlockInstagram,
    AppStoresBlock,
    RelatedPosters
  },

  head() {
    return {
      title: 'Home'
    }
  }
}
</script>
