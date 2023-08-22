<script lang="ts" setup>
import { PostListItemsFragment } from '#gql'

defineProps<{
  posts?: PostListItemsFragment | null
}>()

const localePath = useLocalePath()
</script>

<template>
  <section
    v-if="posts?.edges.length"
    class="latest-posts"
    aria-labelledby="latest-posts-title"
  >
    <center-wrapper size="lg">
      <div class="wrapper">
        <div class="list">
          <h1 id="latest-posts-title">
            {{ $t('posts') }}
          </h1>
          <latest-posts-list :posts="posts.edges" />
          <app-button :to="localePath({ name: 'posts' })">
            {{ $t('morePosts') }}
          </app-button>
        </div>
        <become-member class="become-member" />
        <latest-post-balloon class="balloon" />
      </div>
    </center-wrapper>
  </section>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.latest-posts {
  @mixin block;
}

.wrapper {
  display: grid;
  align-items: start;
  grid-gap: 2em;
  position: relative;
  grid-template-areas:
    'list'
    'become-member'
    'balloon';

  @media (--viewport-md) {
    grid-template-areas:
      'list list'
      'become-member balloon';
  }

  @media (--viewport-lg) {
    grid-template-areas:
      'list become-member'
      'list balloon';
  }
}

.become-member {
  grid-area: become-member;
}

.balloon {
  grid-area: balloon;
  padding-left: 3em;

  @media (--viewport-md) {
    justify-self: center;
    padding-left: 0;
  }
}

.list {
  grid-area: list;
}
</style>
