<template>
  <div class="wrapper">
    <notch-wrapper>
      <div class="buttons">
        <button
          class="btn"
          :aria-expanded="menuIsExpanded"
          @click="toggleMenu(!menuIsExpanded)"
        >
          <icon-bars aria-hidden="true" width="24" height="24" />
          {{ $t('menu') }}
        </button>
        <template v-if="songs.length">
          <button v-if="isPlaying" @click="pauseAudio">
            <icon-pause width="24" height="24" aria-hidden="true" />
            <span class="sr-only">{{ $t('pause') }}</span>
          </button>
          <button v-else @click="playAudio()">
            <icon-play width="24" height="24" aria-hidden="true" />
            <span class="sr-only">{{ $t('play') }}</span>
          </button>
        </template>
      </div>
    </notch-wrapper>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import EventBusUtil from '@/utils/eventBusUtil'
import IconPlay from '@/assets/icons/play.svg'
import IconPause from '@/assets/icons/pause.svg'
import IconBars from '@/assets/icons/bars.svg'
import NotchWrapper from '@/components/NotchWrapper.vue'

export default {
  components: {
    IconPlay,
    IconPause,
    IconBars,
    NotchWrapper
  },
  data() {
    return {
      menuIsExpanded: false
    }
  },
  computed: {
    ...mapState('albums', ['isPlaying']),
    ...mapGetters({
      songs: 'albums/playableSongs'
    })
  },
  watch: {
    $route() {
      this.toggleMenu(false)
    }
  },

  methods: {
    toggleMenu(status) {
      this.menuIsExpanded = status
      this.$emit('toggleMenu', status)
    },
    pauseAudio() {
      EventBusUtil.$emit('audio-play-song', false)
    },
    playAudio() {
      EventBusUtil.$emit('audio-play-song', true)
    }
  }
}
</script>

<style lang="postcss" scoped>
.wrapper {
  position: fixed;
  padding: 0.75em var(--gutter);
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-secondary);
  z-index: var(--mobile-navigation);
  border-bottom: 2px solid var(--color-white);

  @media (--navigation-position-left) {
    display: none;
  }
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 0.5em 0.75em 0.5em 0.5em;
  font-size: 0.8em;
  display: flex;
  align-items: center;
}

svg {
  margin-right: 0.25em;
}
</style>
