<script lang="ts" setup>
const { data } = useFetch("/api/posts/posts", {
  query: {
    pageSize: 3,
  },
});

const localePath = useLocalePath();
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

<style lang="postcss" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.latest-posts {
  padding-bottom: 2em;
}

.wrapper {
  display: grid;
  align-items: start;
  grid-gap: 2em;
  position: relative;
  grid-template-areas:
    "list"
    "become-member"
    "balloon";

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
