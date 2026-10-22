<script lang="ts" setup>
const { data } = useFetch('/api/posts/posts', {
  query: {
    pageSize: 3,
  },
})

const localePath = useLocalePath()
</script>

<template>
  <section
    v-if="data?.items.length"
    class="latest-posts"
    aria-labelledby="latest-posts-title"
  >
    <center-wrapper size="lg">
      <div class="wrapper">
        <div class="list">
          <h1 id="latest-posts-title">
            {{ $t("posts") }}
          </h1>
          <latest-posts-list :posts="data.items" />
          <app-button :to="localePath({ name: 'posts' })">
            {{ $t("morePosts") }}
          </app-button>
        </div>
        <become-member class="become-member" />
        <latest-post-balloon class="balloon" />
      </div>
    </center-wrapper>
  </section>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.latest-posts {
  padding-block-end: 2em;
}

.wrapper {
  position: relative;
  display: grid;
  grid-template-areas:
    "list"
    "become-member"
    "balloon";
  gap: 2em;
  align-items: start;

  @media (--viewport-md) {
    grid-template-areas:
      "list list"
      "become-member balloon";
  }

  @media (--viewport-lg) {
    grid-template-areas:
      "list become-member"
      "list balloon";
  }
}

.become-member {
  grid-area: become-member;
}

.balloon {
  grid-area: balloon;
  padding-inline-start: 3em;

  @media (--viewport-md) {
    justify-self: center;
    padding-inline-start: 0;
  }
}

.list {
  grid-area: list;
}
</style>
