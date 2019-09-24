<template>
  <div>
    <h1 class="sr-only">Home</h1>
    <latest-posts />
    <posters :posters="posters" />
    <AppStoresBlock />
    <BlockInstagram />
    <groups />
  </div>
</template>

<script>
import LatestPosts from '@/components/Blocks/LatestPosts.vue'
import Groups from '@/components/Blocks/Groups.vue'
import BlockInstagram from '@/components/Blocks/BlockInstagram.vue'
import AppStoresBlock from '@/components/Blocks/AppStoresBlock.vue'
import Posters from '@/components/Blocks/Posters.vue'
import PostersQuery from '~/graphql/Posters.gql'

export default {
  components: {
    LatestPosts,
    Groups,
    BlockInstagram,
    AppStoresBlock,
    Posters
  },

  apollo: {
    posters: {
      query: PostersQuery,
      variables: {
        first: 5
      }
    }
  },

  head() {
    return {
      title: 'Home'
    }
  }
}
</script>

<style scoped lang="postcss">
.page {
  @mixin center;
}
</style>
