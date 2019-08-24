<template>
  <div class="groups">
    <div class="center">
      <div class="wrapper">
        <div class="image-wrapper">
          <app-image src="/images/nederland.png" alt class="mood" />
        </div>
        <div class="text">
          <h1>Hier ben ik actief</h1>
          <p>
            Op verschillende plaatsen in Nederland zijn Loesje-groepen actief.
            Een Loesje groep bestaat uit een bonte verzameling mensen die
            regelmatig bijeen komen om te schrijven of te plakken. Ook jij kan
            je aanmelden voor zo’n groep.
          </p>
          <app-button to="/doe-mee" title="Schrijf mee" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppImage from '@/components/Shared/AppImage.vue'
import AppButton from '@/components/Shared/AppButton.vue'

export default {
  components: {
    AppImage,
    AppButton
  }
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
}

.image-wrapper {
  shape-outside: url(/images/nederland.png);
  shape-image-threshold: 0.1;
  shape-margin: 2em;
  margin-bottom: 2em;
  float: right;
}

.text {
  padding-top: 6em;
}
</style>
