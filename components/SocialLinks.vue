<template>
  <nav aria-labelledby="social-links-title">
    <h2 id="social-links-title" class="sr-only">
      {{ $t('socialMediaLinks') }}
    </h2>
    <ul class="social-links">
      <li>
        <a
          href="https://open.spotify.com/artist/2yLSBMXR6j2svRJtsIn2Cz"
          rel="noopener"
          target="_blank"
        >
          <icon-spotify aria-hidden="true" width="32" height="32" />
          <span class="sr-only">{{ $t('viewNordgardenOn') }} spotify</span>
        </a>
      </li>
      <li>
        <a
          href="https://music.apple.com/nl/artist/nordgarden/165768114"
          rel="noopener"
          target="_blank"
        >
          <icon-apple aria-hidden="true" width="32" height="32" />
          <span class="sr-only">{{ $t('viewNordgardenOn') }} Apple</span>
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/channel/UChYwZ-Z9ub3gh0lYcP8Nfag"
          rel="noopener"
          target="_blank"
        >
          <icon-youtube aria-hidden="true" width="32" height="32" />
          <span class="sr-only">{{ $t('viewNordgardenOn') }} youtube</span>
        </a>
      </li>

      <li>
        <a
          href="https://www.facebook.com/NordgardenOfficial/"
          rel="noopener"
          target="_blank"
        >
          <icon-facebook aria-hidden="true" width="32" height="32" />
          <span class="sr-only">{{ $t('viewNordgardenOn') }} facebook</span>
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/TerjeNordgarden"
          rel="noopener"
          target="_blank"
        >
          <icon-twitter aria-hidden="true" width="32" height="32" />
          <span class="sr-only">{{ $t('viewNordgardenOn') }} twitter</span>
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/terje-nordgarden-2460364/"
          rel="noopener"
          target="_blank"
        >
          <icon-linkedin aria-hidden="true" width="32" height="32" />
          <span class="sr-only">{{ $t('viewNordgardenOn') }} LinkedIn</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import IconApple from '@/assets/icons/apple.svg'
import IconYoutube from '@/assets/icons/youtube.svg'
import IconFacebook from '@/assets/icons/facebook.svg'
import IconTwitter from '@/assets/icons/twitter.svg'
import IconLinkedin from '@/assets/icons/linkedin.svg'
import IconSpotify from '@/assets/icons/spotify.svg'

export default {
  components: {
    IconSpotify,
    IconApple,
    IconYoutube,
    IconFacebook,
    IconTwitter,
    IconLinkedin
  }
}
</script>

<style lang="postcss" scoped>
ul {
  @mixin list-reset;

  justify-content: space-between;
  display: flex;
  margin-bottom: 1em;
  max-width: 20em;
}

a {
  @mixin link-reset;
}
</style>
