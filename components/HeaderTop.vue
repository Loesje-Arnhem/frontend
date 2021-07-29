<template>
  <center-wrapper :top="true">
    <div :class="$style.wrapper">
      <div :class="$style.text">
        <h1>Blijf plakken</h1>
        <p v-if="text">{{ text }}</p>
      </div>
      {{ pages }}
      <daily-poster :class="$style['daily-poster']" />
    </div>
  </center-wrapper>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import HeaderTextQuery from '~/graphql/Settings/HeaderText.gql'
export default defineComponent({
  data() {
    return {
      text: null,
    }
  },
  async fetch() {
    const result = await this.$apollo.query({
      query: HeaderTextQuery,
    })
    this.text = result?.data?.themeGeneralSettings?.textGroup?.headerText
  },
})
</script>

<style lang="postcss" module>
.wrapper {
  padding-top: var(--spacing-s);
  max-width: var(--container-width-md);

  @media (--viewport-sm) {
    display: flex;
    align-items: flex-end;
  }

  @media (--show-full-navigation) {
    padding-top: 2em;
  }
}

.text {
  @media (--viewport-sm) {
    padding: 0 0 3em var(--gutter);
  }
}

.daily-poster {
  flex: 0 0 15em;
  order: -1;
}
</style>
