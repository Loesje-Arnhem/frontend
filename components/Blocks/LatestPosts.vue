<template>
  <section class="news-list" aria-labelledby="news-list-title">
    <div class="wrapper">
      <h1 id="news-list-title">{{ $t('latestPosts') }}</h1>

      <ul class="list">
        <app-post v-for="post in list" :key="post.slug" :post="post" />
      </ul>

      <a href="#" class="btn">Meer nieuwsartikelen</a>
    </div>

    <balloon />
  </section>
</template>

<script>
//  import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import AppPost from '@/components/AppPost.vue'
import Balloon from '@/components/Illustrations/Balloon.vue'

export default {
  components: {
    AppPost,
    Balloon
  },

  computed: {
    ...mapState('posts', ['list'])
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
</style>
