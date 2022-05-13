<template>
  <center-wrapper :top="true">
    <div :class="$style.wrapper">
      <div :class="$style.text">
        <h1>Wie zegt wat hoort</h1>
        <p>
          Loesje's posters vind je overal. Met haar positief-kritische teksten
          wil ze de wereld beter en mooier maken. Dat moet je niet overlaten aan
          bazen, politici of ouders. Door haar posters op straat en online te
          verspreiden, geeft Loesje de wereld een zetje in de goede richting.
        </p>
      </div>
      <div :class="$style['poster-daily']">
        <div :class="$style['image-wrapper']">
          <client-only>
            <daily-poster :class="$style.image" />
          </client-only>
        </div>
        <nuxt-picture
          src="/images/electriciteitskastje.png"
          alt=""
          preload
          :class="$style.background"
          width="270"
          height="362"
          preset="base"
          format="avif"
          sizes="sm:80vw md:60vw lg:33vw xl:340 xxl:500"
        />
      </div>
    </div>
  </center-wrapper>
</template>

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

.poster-daily {
  flex: 0 0 15em;
  order: -1;
  position: relative;
  max-width: 18em;
  width: 100%;
  margin: 0 auto -1em;
}

.image-wrapper {
  position: absolute;
  inset: 9% 13% auto 17%;
  transform: rotate(-2deg);

  &::after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    box-shadow: inset 0 0 0 1px var(--color-white);
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
