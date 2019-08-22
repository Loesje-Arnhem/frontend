<template>
  <footer class="footer">
    <notch-wrapper>
      <div class="wrapper">
        <div class="quicklinks">
          <h2>Handige links</h2>
          <ul>
            <li>
              <a href="/workshops/">
                <icon-chevron-right width="12" height="12" aria-hidden="true" />
                Workshops
              </a>
            </li>
            <li>
              <a href="/doe-mee/lokale-groepen/">
                <icon-chevron-right width="12" height="12" aria-hidden="true" />
                Lokale groepen
              </a>
            </li>
            <li>
              <a href="/doe-mee/lokale-groepen/">
                <icon-chevron-right width="12" height="12" aria-hidden="true" />
                Loesje internationaal
              </a>
            </li>
            <li>
              <a href="/doe-mee/lokale-groepen/">
                <icon-chevron-right width="12" height="12" aria-hidden="true" />
                Word lid
              </a>
            </li>
            <li>
              <a href="/doe-mee/lokale-groepen/">
                <icon-chevron-right width="12" height="12" aria-hidden="true" />
                Word donateur
              </a>
            </li>
          </ul>
        </div>

        <div class="contact">
          <h2>Loesjes winkeltje</h2>
          <div class="address-data">
            <div class="contact-title">Adres:</div>
            Hommelstraat 65<br />
            6828 AJ Arnhem<br />
            <a href="mailto:winkeltje@loesje.nl">winkeltje@loesje.nl</a><br />
            KvK-nummer 40122845<br />
          </div>
        </div>
        <app-stores />

        <div class="follow-us">
          <h2>Volg me op</h2>

          <social-media-links title="Loesje" :social-media="socialMedia" />

          <div class="mood-wrapper">
            <img src="/images/casette-player.png" alt="" class="mood" />
          </div>
        </div>
      </div>
    </notch-wrapper>
  </footer>
</template>

<script>
import IconChevronRight from '@/assets/icons/chevron-right.svg'
import SocialMediaLinks from '@/components/SocialMediaLinks.vue'
import AppStores from '@/components/AppStores.vue'
import NotchWrapper from '@/components/NotchWrapper.vue'

export default {
  components: {
    IconChevronRight,
    SocialMediaLinks,
    AppStores,
    NotchWrapper
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
  grid-gap: 1rem;

  & ul {
    @mixin list-reset;
  }
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
