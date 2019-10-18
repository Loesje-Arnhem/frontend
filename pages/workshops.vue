<template>
  <div class="page">
    <div class="intro">
      <h1>{{ page.title }}</h1>
      <!-- eslint-disable-next-line -->
      <div class="text" v-html="page.content" />
    </div>
    <form-workshop />
    <posters :posters="posters" />
  </div>
</template>

<script>
import PageQuery from '~/graphql/Page.gql'
import Posters from '@/components/Blocks/Posters.vue'
import FormWorkshop from '@/components/Blocks/FormWorkshop.vue'
import PostersQuery from '~/graphql/Posters.gql'

export default {
  components: {
    Posters,
    FormWorkshop
  },
  async asyncData({ app, params }) {
    const page = await app.apolloProvider.defaultClient.query({
      query: PageQuery,
      variables: {
        uri: 'workshops'
      }
    })

    const response = page.data.page

    const posters = await app.apolloProvider.defaultClient.query({
      query: PostersQuery,
      variables: {
        first: 5
      }
    })
    return {
      page: response,
      posters: posters.data.posters
    }
  },
  head() {
    return {
      title: this.page.title
    }
  }
}
</script>

<style scoped lang="postcss">
.intro {
  @mixin center var(--container-width-md);
  @mixin block;
}
</style>
