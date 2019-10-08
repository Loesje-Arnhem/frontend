<template>
  <div>
    <section
      v-if="hasPosts"
      class="news-list"
      aria-labelledby="news-list-title"
    >
      <div class="wrapper">
        <h1 id="news-list-title">Nieuws</h1>
        <posts-list :posts="posts" />
        <app-button v-if="showButton" to="/over-mij/nieuws"
          >Meer nieuwsartikelen</app-button
        >
        <balloon />
      </div>
    </section>
  </div>
</template>

<script>
import AppButton from '@/components/Shared/AppButton.vue'
import Balloon from '@/components/Illustrations/Balloon.vue'
import PostsList from '@/components/Posts/PostsList.vue'

export default {
  components: {
    Balloon,
    AppButton,
    PostsList
  },

  props: {
    posts: {
      type: Object,
      required: true
    },
    showButton: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    hasPosts() {
      return this.posts && this.posts.edges && this.posts.edges.length
    }
  }
}
</script>

<style lang="postcss" scoped>
.news-list {
  @mixin block;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
}

.wrapper {
  @mixin center var(--container-width-lg);
  position: relative;
}

.list {
  @mixin list-reset;
  margin-bottom: 2em;
  max-width: 42rem;
}
</style>
