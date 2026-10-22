<template>
  <div class="loader">
    <div class="dot dot-1" />
    <div class="dot dot-2" />
    <div class="dot dot-3" />
    <div class="dot dot-4" />
    <span
      class="sr-only"
      aria-live="polite"
      role="region"
    >
      {{ $t("loading") }}
    </span>
  </div>
</template>

<style lang="css" scoped>
.loader {
  position: relative;
  display: flex;
  align-items: center;
  inline-size: 64px;
  block-size: 11px;
  margin: 2em auto;
}

.dot {
  position: absolute;
  inline-size: 11px;
  block-size: 11px;
  background: currentcolor;
  border-radius: 50%;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.dot-1 {
  inset-inline-start: 6px;
  animation: loader1 0.6s infinite;
}

.dot-2 {
  inset-inline-start: 6px;
  animation: loader2 0.6s infinite;
}

.dot-3 {
  inset-inline-start: 26px;
  animation: loader2 0.6s infinite;
}

.dot-4 {
  inset-inline-start: 45px;
  animation: loader3 0.6s infinite;
}

@keyframes loader1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes loader3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes loader2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(19px, 0);
  }
}
</style>
