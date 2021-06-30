<template>
  <div v-if="page" class="page">
    <center-wrapper>
      <div :class="$style.wrapper">
        <app-content :title="page.title" :content="page.content" />
        <div>
          <div class="video" :class="$style.video">
            <iframe
              loading="lazy"
              :class="$style.video"
              title="Workshop creatief schrijven met Loesje"
              width="500"
              height="281"
              src="https://www.youtube.com/embed/1Pr__G4H4sg?feature=oembed"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <form-workshop />
        </div>
      </div>
    </center-wrapper>
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
  grid-template-columns: 2fr 1fr;
}
</style>

