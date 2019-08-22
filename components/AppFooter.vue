<template>
  <footer class="footer">
    <div class="footer__wrapper">
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

      <div class="app">
        <h2>Loesje in de App Store</h2>
        <a
          href="https://itunes.apple.com/nl/app/loesje-posters/id910472463?l=nl&amp;ls=1&amp;mt=8"
          target="_blank"
          rel="noopener"
        >
          icon('apple-store', 'footer__store-icon', __('De loesje App voor iOs
          is verkrijgbaar in de AppStore', 'loesje')); ?></a
        >
        <a
          href="https://itunes.apple.com/nl/app/loesje-posters/id910472463?l=nl&amp;ls=1&amp;mt=8"
          target="_blank"
          rel="noopener"
        >
          icon('play-store', 'footer__store-icon', __('De loesje App voor
          Android is verkrijgbaar in de Play Store', 'loesje')); ?></a
        >
      </div>

      <div class="follow-us">
        <h2>Volg me op</h2>

        <social-media-links title="Loesje" :social-media="socialMedia" />

        <div class="footer__mood-wrapper">
          <img src="/images/casette-player.png" alt="" class="footer__mood" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import IconChevronRight from '@/assets/icons/chevron-right.svg'
import SocialMediaLinks from '@/components/SocialMediaLinks.vue'

export default {
  components: {
    IconChevronRight,
    SocialMediaLinks
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
  background: var(--color-black);
  color: var(--color-white);
}

.footer__wrapper {
  @mixin center;
  display: grid;
  grid-gap: 2rem 1rem;

  @media (--viewport-md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (--viewport-lg) {
    grid-template-columns: repeat(4, 1fr);
  }

  & ul {
    @mixin list-reset;
  }
}

.footer__store-icon {
  @mixin icon 12em, 4em;
  display: block;
  margin: 0.5em 0;
  fill: var(--color-black);
}

.footer__icon {
  @mixin icon 0.7em;
}

.footer__social-link {
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
}

.footer__mood-wrapper {
  margin-top: 2em;
  text-align: right;
  transform: rotate(3deg);
}

.footer__social-icon {
  @mixin icon 2em;
}
</style>
