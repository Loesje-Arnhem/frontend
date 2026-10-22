<template>
  <div class="skip-links">
    <app-button
      :to="{
        hash: '#content',
      }"
      class="btn"
    >
      Naar hoofdinhoud
    </app-button>
    <app-button
      :to="{
        hash: '#menu',
      }"
      class="btn"
    >
      Naar hoofdnavigatiemenu
    </app-button>
  </div>
</template>

<style lang="css" scoped>
.btn {
  &:not(:focus) {
    @mixin sr-only;
  }

  &:focus,
  &:active {
    position: fixed;
    inset-block-start: 1rem;
    inset-inline-start: 1rem;
    z-index: var(--z-skip-links);
  }
}
</style>
