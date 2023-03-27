<template>
  <div class="groups">
    <center-wrapper size="md">
      <div class="center">
        <div class="wrapper">
          <div class="image-wrapper">
            <app-image
              src="/images/nederland.png"
              :width="565"
              :height="600"
              class="mood"
              sizes="sm:100vw md:80vw lg:565 xl:800"
            />
          </div>
          <div class="text">
            <h1>Hier ben ik actief</h1>
            <p>
              Op verschillende plaatsen in Nederland zijn Loesje-groepen actief.
              Een Loesje groep bestaat uit een bonte verzameling mensen die
              regelmatig bijeen komen om te schrijven of te plakken. Ook jij kan
              je aanmelden voor zo’n groep.
            </p>
            <app-button to="/doe-mee/lokale-groepen">
              Schrijf mee
            </app-button>
          </div>
        </div>
      </div>
    </center-wrapper>
  </div>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.groups {
  @mixin block;
  @mixin clearfix;
}

.wrapper {
  display: flex;
  flex-direction: column;

  @media (--viewport-lg) {
    display: block;
  }
}

.image-wrapper {
  margin-bottom: 2em;

  @media (--viewport-lg) {
    shape-outside: url('/images/nederland.png');
    shape-image-threshold: 10%;
    shape-margin: 2em;
    float: right;
  }
}

.text {
  order: -1;

  @media (--viewport-lg) {
    padding-top: 6em;
  }
}
</style>
