<template>
  <section class="news-list" aria-labelledby="news-list-title">
    <div class="wrapper">
      <h1 id="news-list-title">{{ $t('latestPosts') }}</h1>

      <ul class="list">
        <app-post v-for="post in getFirstPosts" :key="post.slug" :post="post" />
      </ul>
      <app-button to="/nieuws" title="Meer nieuwsartikelen" />
    </div>

    <balloon />
  </section>
</template>

<script>
//  import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import AppPost from '@/components/AppPost.vue'
import AppButton from '@/components/Shared/AppButton.vue'
import Balloon from '@/components/Illustrations/Balloon.vue'

export default {
  components: {
    AppPost,
    Balloon,
    AppButton
  },

  computed: {
    ...mapGetters('posts', ['getFirstPosts'])
  },

  mounted() {
    if (!this.getFirstPosts.length) this.setPosts(this.currentPage)
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
