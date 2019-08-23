<template>
  <div class="balloon">
    <img src="/images/air-balloon.png" alt="" class="balloon-image" />
  </div>
</template>

<style lang="postcss" scoped>
.balloon {
  position: absolute;
  bottom: 4rem;
  right: 4rem;
}

.balloon {
  animation: balloonX 20s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
}

.balloon-image {
  animation: balloonY 20s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
}

@keyframes balloonY {
  50% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateY(-8rem);
  }
}

@keyframes balloonX {
  50% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateX(-2rem);
  }
}
</style>
