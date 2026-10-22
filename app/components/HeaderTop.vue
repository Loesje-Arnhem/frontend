<template>
  <center-wrapper :top="true">
    <div class="wrapper">
      <div class="text">
        <h1>Loesje breidt haar vriendenclub uit!</h1>
        <p>
          Als vriend help je Loesje om onafhankelijk te blijven schrijven, posters te verspreiden en mensen samen te brengen. Kom je ook bij Loesjes vriendenclub?
        </p>
        <app-button
          to="/word-vrienden-met-loesje/"
          class="btn"
        >
          Word vriend van Loesje
        </app-button>
      </div>
      <div class="poster-daily">
        <div class="image-wrapper">
          <nuxt-link-locale :to="{ name: 'daily-poster' }">
            <daily-poster class="image" />
          </nuxt-link-locale>
        </div>
        <app-image
          src="/images/electriciteitskastje.png"
          :lazy="false"
          class="background"
          :width="270"
          :height="360"
          sizes="50vw sm:270px"
        />
      </div>
    </div>
  </center-wrapper>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.wrapper {
  max-inline-size: var(--container-width-md);
  padding-block-start: var(--spacing-s);

  @media (--viewport-sm) {
    display: flex;
    align-items: flex-end;
  }

  @media (--show-full-navigation) {
    padding-block-start: 2em;
  }
}

.text {
  @media (--viewport-sm) {
    padding: 0 0 3em var(--gutter);
  }
}

.poster-daily {
  position: relative;
  flex: 0 0 15em;
  order: -1;
  inline-size: 100%;
  max-inline-size: 18em;
  margin: 0 auto -1em;
}

.image-wrapper {
  position: absolute;
  inset: 9% 13% auto 17%;
  transform: rotate(-2deg);

  &::after {
    position: absolute;
    inset: 0;
    display: block;
    pointer-events: none;
    content: "";
    box-shadow: inset 0 0 0 1px var(--color-white);
  }
}

.image {
  display: block;
}

.background {
  display: block;
  inline-size: 100%;
}
</style>
