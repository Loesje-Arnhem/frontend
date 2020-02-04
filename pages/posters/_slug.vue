<template>
  <div>
    <div class="wrapper">
      <navigation />

      <poster-details :poster="poster" />
    </div>
    <posters-overview-section :not-in="poster.posterId" />
  </div>
</template>

<script>
import PosterDetails from '@/components/Poster/PosterDetails.vue'
import Navigation from '@/components/Shared/Navigation.vue'
import PostersOverviewSection from '@/components/Posters/PostersOverview/PostersOverviewSection.vue'
import PosterQuery from '~/graphql/Poster.gql'

export default {
  components: {
    PosterDetails,
    Navigation,
    PostersOverviewSection
  },

  async asyncData({ app, params }) {
    const poster = await app.apolloProvider.defaultClient.query({
      query: PosterQuery,
      variables: {
        slug: params.slug
      }
    })

    return {
      poster: poster.data.poster
    }
  },

  head() {
    return {
      title: this.poster.title
    }
  }
}
</script>

<style lang="postcss" scoped>
.wrapper {
  @mixin block;
  @mixin center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}

.poster {
  grid-row: span 2;
}

.meta-data,
.social-bar {
  background: $gray-lighter;
}

.meta-data {
  padding: 1em 1em 0.25em;
}

dt {
  border-top: 1px solid var(--color-white);
  padding: 0.5em 0 0;
  font-weight: $font-weight-bold;
}

dd {
  margin: 0;
}

.tags {
  @mixin list-reset;
  margin-bottom: 0.5em;

  li {
    display: inline;

    &:not(:last-child)::after {
      content: ',';
      margin-right: 0.5ch;
    }
  }
}

.btn-favorites {
  display: flex;
  padding: 0.25em 0.75em;
  border: 2px solid var(--color-black);
  border-radius: 1em;
  background: var(--color-white);
  align-items: center;

  &.is-active,
  &:hover {
    background: var(--color-black);
    color: var(--color-white);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--color-black);
    outline: none;
  }
}

.icon-favorites {
  flex: 0 0 auto;
  margin-top: -0.1em;
  margin-right: 0.5em;
}

.btn-tag {
  text-decoration: underline;
}
</style>
