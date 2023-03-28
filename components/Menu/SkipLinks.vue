<template>
  <div class="skip-links">
    <app-button
      href="#content"
      class="btn"
    >
      Naar hoofdinhoud
    </app-button>
    <app-button
      href="#menu"
      class="btn"
    >
      Naar hoofdnavigatiemenu
    </app-button>
  </div>
</template>

<style lang="postcss" scoped>
.btn {
  &:not(:focus) {
    @mixin sr-only;
  }

  &:focus,
  &:active {
    position: fixed;
    z-index: var(--z-skip-links);
    top: 1rem;
    left: 1rem;
  }
}
</style>
