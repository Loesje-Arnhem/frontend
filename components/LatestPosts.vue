<template>
  <section class="news-list" aria-labelledby="news-list-title">
    <h1 id="news-list-title">{{ $t('latestPosts') }}</h1>
    <transition-group name="list" tag="ul">
      <app-post v-for="post in list" :key="post.slug" :post="post" />
    </transition-group>
    <app-loader v-if="isLoading" />
    <div v-else-if="!hasAllPostsLoaded" class="button-wrapper">
      <button class="btn" @click="setPosts(currentPage)">
        {{ $t('loadMore') }}
      </button>
    </div>
  </section>
</template>

<script>
//  import axios from 'axios'
import { mapActions, mapState, mapGetters } from 'vuex'
import AppPost from '@/components/AppPost.vue'
import AppLoader from '@/components/AppLoader.vue'

export default {
  components: {
    AppLoader,
    AppPost
  },

  computed: {
    ...mapState('posts', ['list', 'isLoading', 'currentPage', 'totalPages']),
    ...mapGetters({
      hasAllPostsLoaded: 'posts/hasAllPostsLoaded'
    })
  },

  mounted() {
    if (!this.list.length) this.setPosts(this.currentPage)
  },
  methods: {
    ...mapActions({
      setPosts: 'posts/setPosts'
    })
  }
}
</script>

<style lang="postcss" scoped>
.news-list {
  margin-bottom: 5em;
}

ul {
  @mixin list-reset;

  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(1em);
}

.button-wrapper {
  display: flex;
  justify-content: center;
}

.btn {
  width: 100%;
}
</style>
