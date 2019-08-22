<template>
  <div class="page">
    <h1>{{ title }}</h1>
    <auto-complete />
    <Posters :posters="posters" />
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import AutoComplete from '@/components/Search/AutoComplete.vue'
import Posters from '@/components/Shared/Posters.vue'

export default {
  components: {
    AutoComplete,
    Posters
  },
  data() {
    return {
      title: 'Posters'
    }
  },
  async asyncData({ params }) {
    try {
      const response = await axios.get(`wp/v2/poster`)
      return {
        posters: response.data
      }
    } catch (error) {
      // console.error(error)
    }
  },

  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style scoped lang="postcss">
.page {
  @mixin center;
}
</style>
