<template>
  <div class="loader">
    <div class="dot dot-1" />
    <div class="dot dot-2" />
    <div class="dot dot-3" />
    <div class="dot dot-4" />
    <span class="sr-only" aria-live="polite" role="region">
      {{ $t("loading") }}
    </span>
  </div>
</template>

<style lang="postcss" scoped>
.loader {
  margin: 2em auto;
  position: relative;
  width: 64px;
  height: 11px;
  display: flex;
  align-items: center;
}

.dot {
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: currentcolor;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.dot-1 {
  left: 6px;
  animation: loader1 0.6s infinite;
}

.dot-2 {
  left: 6px;
  animation: loader2 0.6s infinite;
}

.dot-3 {
  left: 26px;
  animation: loader2 0.6s infinite;
}

.dot-4 {
  left: 45px;
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
