<template>
  <section class="news-list" aria-labelledby="news-list-title">
    <div class="wrapper">
      <h1 id="news-list-title">{{ $t('latestPosts') }}</h1>

      <ul class="list">
        <app-post v-for="post in list" :key="post.slug" :post="post" />
      </ul>

      <a href="#" class="btn">Meer nieuwsartikelen</a>
    </div>

    <div class="balloon">
      <img src="/images/air-balloon.png" alt="" class="balloon-image" />
    </div>
  </section>
</template>

<script>
//  import axios from 'axios'
import { mapActions, mapState, mapGetters } from 'vuex'
import AppPost from '@/components/AppPost.vue'

export default {
  components: {
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
  @mixin block;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  position: relative;
}

.wrapper {
  @mixin center;
}

.list {
  @mixin list-reset;
  max-width: var(--container-width-md);
}

.balloon {
  position: absolute;
  bottom: 4rem;
  right: 4rem;
}

.balloon {
  animation: balloonX 20s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
}

.balloon-image {
  animation: balloonY 20s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
}

@keyframes balloonY {
  50% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateY(-8rem);
  }
}

@keyframes balloonX {
  50% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateX(-2rem);
  }
}
</style>
