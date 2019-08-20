<template>
  <li class="album">
    <h2>{{ album.title }}</h2>
    <div>
      <img
        width="200"
        height="200"
        loading="lazy"
        :src="`/media/images/${album.image}.jpg?nf_resize=fit&w=200&h=200`"
        alt
        :srcset="
          `/media/images/${album.image}.jpg?nf_resize=fit&w=400&h=400 2x`
        "
      />
      <post-date :date="album.releaseDate" />
      <ul class="shops">
        <li>
          <a :href="album.spotify" rel="noopener" target="_blank">
            <icon-spotify aria-hidden="true" width="24" height="24" />
            <span class="sr-only"
              >{{ $t('view') }} {{ album.title }} {{ $t('on') }} Spotify</span
            >
          </a>
        </li>
        <li>
          <a :href="album.apple" rel="noopener" target="_blank">
            <icon-apple aria-hidden="true" width="24" height="24" />
            <span class="sr-only">
              {{ $t('view') }} {{ album.title }} {{ $t('on') }} Apple Music
            </span>
          </a>
        </li>
      </ul>
    </div>
    <div>
      <ul class="songlist">
        <app-song
          v-for="song in album.songlist"
          :key="song.title"
          :song="song"
          class="song"
        />
      </ul>
    </div>
  </li>
</template>

<script>
import AppSong from '@/components/AppSong.vue'
import IconApple from '@/assets/icons/apple.svg'
import IconSpotify from '@/assets/icons/spotify.svg'
import PostDate from '@/components/PostDate.vue'

export default {
  components: {
    IconSpotify,
    IconApple,
    AppSong,
    PostDate
  },
  props: {
    album: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
ul {
  @mixin list-reset;
}

h2 {
  margin: 0;
  grid-column: 1 / -1;
}

.album {
  display: grid;
  grid-gap: 1em;
  margin-bottom: 2em;

  @media (--viewport-sm) {
    grid-template-columns: 10em auto;
  }
}

time {
  margin-bottom: 0.25em;
  display: block;
}

img {
  display: block;
  max-width: 10em;
  margin-bottom: 0.25em;
  width: 100%;
  @media (--viewport-sm) {
    max-width: none;
  }
}

.songlist {
  max-width: var(--container-width-sm);
  border-top: 1px solid #ccc;
}

.shops {
  display: flex;
}

a {
  @mixin link-reset;

  flex: 0 0 1em;
  margin-right: 0.5em;
}
</style>
