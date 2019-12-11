<template>
  <div>
    <h1 class="sr-only">Home</h1>
    <latest-posts-container />
    <related-posters-container />
    <AppStoresBlock />
    <BlockInstagram />
    <groups />
  </div>
</template>

<script>
import Groups from '@/components/Blocks/Groups.vue'
import BlockInstagram from '@/components/Blocks/BlockInstagram.vue'
import AppStoresBlock from '@/components/Blocks/AppStoresBlock.vue'
import RelatedPostersContainer from '@/components/Posters/RelatedPosters/RelatedPostersContainer.vue'
import LatestPostsContainer from '@/components/Posts/LatestPosts/LatestPostsContainer.vue'

export default {
  components: {
    Groups,
    BlockInstagram,
    AppStoresBlock,
    RelatedPostersContainer,
    LatestPostsContainer
  },

  head() {
    return {
      title: 'Home'
    }
  }
}
</script>
