<template>
  <center-wrapper>
    <div class="checkout">
      CHECKOT
      <address-fields />
    </div>
  </center-wrapper>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/afrekenen',
    },
  },
}
</script>

<style scoped lang="postcss">
.checkout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
}
</style>
