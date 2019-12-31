<template>
  <div>
    <h1 class="sr-only">Home</h1>
    <latest-posts-container />
    <related-posters-container />
    <app-stores-section />
    <BlockInstagram />
    <groups />
  </div>
</template>

<script>
import Groups from '~/components/Blocks/Groups.vue'
import BlockInstagram from '~/components/Blocks/BlockInstagram.vue'
import AppStoresSection from '~/components/AppStores/AppStoresSection.vue'
import RelatedPostersContainer from '~/components/Posters/RelatedPosters/RelatedPostersContainer.vue'
import LatestPostsContainer from '~/components/Posts/LatestPosts/LatestPostsContainer.vue'

export default {
  components: {
    Groups,
    BlockInstagram,
    RelatedPostersContainer,
    AppStoresSection,
    LatestPostsContainer
  },

  head() {
    return {
      title: 'Home'
    }
  }
}
</script>
