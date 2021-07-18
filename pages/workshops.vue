<template>
  <div v-if="page" class="page">
    <center-wrapper>
      <div :class="$style.wrapper">
        <app-content
          :title="page.title"
          :content="page.content"
          :class="$style.content"
        />
        <app-video video="1Pr__G4H4sg" :class="$style.video" />
      </div>
    </center-wrapper>
    <form-workshop />
    <related-posters-section :related-posters="page.relatedPosters" />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script>
import { workshopsPageId } from '~/data/pages'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import getSeoMetaData from '~/utils/seo'

export default {
  async asyncData({ app }) {
    const { defaultClient } = app.apolloProvider
    const result = await defaultClient.query({
      query: PageByIdQuery,
      variables: {
        id: workshopsPageId,
      },
    })
    return {
      page: result.data.page,
    }
  },
  head() {
    return getSeoMetaData(this.page.seo)
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  @mixin block;

  display: grid;
  grid-gap: var(--gutter);

  @media (--viewport-lg) {
    grid-template-columns: auto 25em;
  }
}

.content :global(.video) {
  display: none;
}

.video {
  margin-top: 2em;
}
</style>
