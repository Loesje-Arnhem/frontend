<template>
  <center-wrapper :top="true">
    <div :class="$style.wrapper">
      <div :class="$style.text">
        <h1>Wie zegt wat hoortt</h1>
        <p>
          Loesje's posters vind je overal. Met haar positief-kritische teksten
          wil ze de wereld beter en mooier maken. Dat moet je niet overlaten aan
          bazen, politici of ouders. Door haar posters op straat en online te
          verspreiden, geeft Loesje de wereld een zetje in de goede richting.
        </p>
      </div>
      <daily-poster :class="$style['daily-poster']" />
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

.daily-poster {
  flex: 0 0 15em;
  order: -1;
}
</style>
