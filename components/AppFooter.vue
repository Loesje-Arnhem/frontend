<template>
  <footer class="footer">
    <div class="wrapper">
      <quick-links />

      <company-address />

      <app-stores />

      <div class="follow-us">
        <h2>Volg me op</h2>

        <social-media-links title="Volg Loesje" :social-media="socialMedia" />

        <div class="mood-wrapper">
          <img src="/images/casette-player.png" alt class="mood" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import SocialMediaLinks from '@/components/SocialMediaLinks.vue'
import AppStores from '@/components/Footer/AppStores.vue'
import CompanyAddress from '@/components/Footer/CompanyAddress.vue'
import QuickLinks from '@/components/Footer/QuickLinks.vue'

export default {
  components: {
    QuickLinks,
    SocialMediaLinks,
    AppStores,
    CompanyAddress
  },
  data() {
    return {
      socialMedia: {
        twitter: 'https://twitter.com/LoesjeNL',
        facebook: 'https://twitter.com/LoesjeNL',
        instagram: 'https://instagram.com/loesjevdposters',
        pinterest: 'https://www.pinterest.com/loesjenl/',
        linkedin: 'https://www.linkedin.com/company/loesje/'
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.footer {
  @mixin block;
  @mixin color-negative;
}

.wrapper {
  @mixin center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14em, 1fr));
  grid-gap: var(--gutter);
}

.mood-wrapper {
  margin-top: 2em;
  text-align: right;
  transform: rotate(3deg);
}

.btn-store {
  @mixin link-reset;
}

.icon-store {
  fill: inherit;
  width: 100%;
  height: auto;
  margin-bottom: 0.5em;
}
</style>
