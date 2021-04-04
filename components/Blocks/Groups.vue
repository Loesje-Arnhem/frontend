<template>
  <div class="groups">
    <div class="center">
      <div class="wrapper">
        <div class="image-wrapper">
          <app-image src="/images/nederland.png" class="mood" />
        </div>
        <div class="text">
          <h1>Hier ben ik actief</h1>
          <p>
            Op verschillende plaatsen in Nederland zijn Loesje-groepen actief.
            Een Loesje groep bestaat uit een bonte verzameling mensen die
            regelmatig bijeen komen om te schrijven of te plakken. Ook jij kan
            je aanmelden voor zo’n groep.
          </p>
          <app-button to="/doe-mee/lokale-groepen">Schrijf mee</app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppImage from '~/components/Shared/AppImage.vue'
import AppButton from '~/components/Shared/AppButton.vue'

export default {
  components: {
    AppImage,
    AppButton,
  },
}
</script>

<style lang="postcss" scoped>
.groups {
  @mixin block;
  @mixin clearfix;
}

.center {
  @mixin center;
}

.wrapper {
  max-width: var(--container-width-md);
  display: flex;
  flex-direction: column;

  @media (--viewport-md) {
    display: block;
  }
}

.image-wrapper {
  margin-bottom: 2em;

  @media (--viewport-md) {
    shape-outside: url(/images/nederland.png);
    shape-image-threshold: 0.1;
    shape-margin: 2em;
    float: right;
  }
}

.text {
  order: -1;

  @media (--viewport-md) {
    padding-top: 6em;
  }
}
</style>
