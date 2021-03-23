<template>
  <div>{{ posts }}</div>
</template>

<script>
import usePosts from '~/compositions/posts'

export default {
  setup() {
    const { posts, loading, error } = usePosts({
      first: 3,
    })

    return {
      posts,
      loading,
      error,
    }
  },
}
</script>

<style lang="postcss" module>
.latest-posts {
  @mixin block;
}

.wrapper {
  position: relative;

  @media (--viewport-lg) {
    display: grid;
    align-items: start;
    grid-gap: 2em;
    grid-template-columns: 2fr 1fr;
  }
}
</style>

<i18n>
{
  "nl": {
    "title": "Nieuws",
    "btnMore": "Meer nieuwsartikelen"
  }
}
</i18n>
