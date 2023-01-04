<template>
  <center-wrapper size="sm">
    <client-only>
      <daily-poster
        class="daily-poster"
        sizes="default: '(max-width: 640px) 90vw, 540px',"
      />
    </client-only>
  </center-wrapper>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'

export default defineComponent({
  components: { CenterWrapper },
  head: {},
  nuxtI18n: {
    paths: {
      nl: '/dagelijkse-poster',
    },
  },
})
</script>

<style lang="postcss" scoped>
.daily-poster {
  margin-block: 4em;
}
</style>
