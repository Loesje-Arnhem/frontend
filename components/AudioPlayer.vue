<template>
  <div class="player">
    <button v-if="isPlaying" :disabled="!songs.length" @click="pause">
      <icon-pause width="24" height="24" aria-hidden="true" />
      <span class="sr-only">{{ $t('pause') }}</span>
    </button>
    <button v-else :disabled="!songs.length" @click="play">
      <icon-play width="24" height="24" aria-hidden="true" />
      <span class="sr-only">{{ $t('play') }}</span>
    </button>
    <button :disabled="songs.length < 1" @click="next">
      <icon-forwards width="24" height="24" aria-hidden="true" />
      <span class="sr-only">{{ $t('next') }}</span>
    </button>
    <div v-show="songs.length" ref="progress" class="progress" @click="scrub">
      <div class="bar" :style="{ width: progress }"></div>
      <div class="title">{{ currentSong.title }}</div>
    </div>
    <audio
      id="audio"
      ref="audio"
      :src="currentSong.file"
      @timeupdate="timeupdate"
      @ended="next"
      @play="setPlayState(true)"
      @pause="setPlayState(false)"
    ></audio>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import EventBusUtil from '@/utils/eventBusUtil'

import IconPlay from '@/assets/icons/play.svg'
import IconPause from '@/assets/icons/pause.svg'
import IconForwards from '@/assets/icons/forwards.svg'

export default {
  components: {
    IconPlay,
    IconPause,
    IconForwards
  },
  data() {
    return {
      songIndex: 1,
      player: null,
      progress: 0
    }
  },
  computed: {
    ...mapState('albums', ['currentSong', 'isPlaying']),
    ...mapGetters({
      songs: 'albums/playableSongs'
    })
  },

  created() {
    EventBusUtil.$on('audio-play-song', state =>
      state ? this.play() : this.pause()
    )
    this.$nextTick(() => {
      this.player = this.$refs.audio
    })
  },
  methods: {
    ...mapActions({
      setPlayState: 'albums/setPlayState',
      selectNextSong: 'albums/selectNextSong'
    }),
    pause() {
      this.player.pause()
    },
    play() {
      this.player.play()
    },
    next() {
      this.selectNextSong(this.currentSong).then(() => {
        this.player.play()
      })
    },
    scrub(event) {
      const progress = this.$refs.progress
      const scrubTime =
        (event.offsetX / progress.offsetWidth) * this.player.duration
      this.player.currentTime = scrubTime
    },
    timeupdate() {
      this.progress = `${(this.player.currentTime / this.player.duration) *
        100}%`
    }
  }
}
</script>

<style lang="postcss" scoped>
.player {
  margin-bottom: 2em;
  display: flex;
}

audio {
  width: 100%;
}

button {
  text-align: center;
  margin-right: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress {
  position: relative;
  flex: 1 0 auto;
  cursor: pointer;
}

.title {
  max-width: 12rem;
  padding: 0 0.25em;
  font-size: 0.8em;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
}

.bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: var(--color-black);
}
</style>
