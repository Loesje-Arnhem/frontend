<template>
  <div class="poster-daily">
    <div class="image-wrapper">
      <img
        src="https://www.loesje.nl/wp-content/uploads/2019/02/2019-08-22.jpg"
        alt=""
        class="image"
      />
    </div>
    <img src="/images/electriciteitskastje.png" alt="" class="background" />
  </div>
</template>

<style lang="postcss" scoped>
.poster-daily {
  position: relative;
  margin-bottom: -0.5em;
  max-width: 18em;
  width: 100%;
}

.image-wrapper {
  position: absolute;
  top: 15%;
  left: 22%;
  width: 65%;

  &::after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    box-shadow: inset 0 0 0 1px #fff;
  }
}

.image {
  display: block;
}

.background {
  width: 100%;
  display: block;
}
</style>
