<template>
  <li>
    <div class="button-wrapper">
      <template v-if="song.file">
        <button
          v-if="!isPlayingCurrentSong(song)"
          class="btn-play"
          @click="play(song)"
        >
          <icon-play width="20" height="20" aria-hidden="true" />
          <span class="sr-only">{{ $t('play') }}</span>
        </button>
        <button v-else class="btn-pause" @click="pause">
          <icon-pause width="20" height="20" aria-hidden="true" />
          <span class="sr-only">{{ $t('pause') }}</span>
        </button>
      </template>
    </div>
    <span class="title">{{ song.title }}</span>
    <template v-if="song.lyrics">
      <button @click="toggleModal(true)">lyrics</button>
      <app-modal
        v-if="showModal"
        :title="song.title"
        @close="toggleModal(false)"
        >{{ song.lyrics }}</app-modal
      >
    </template>
  </li>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import EventBusUtil from '@/utils/eventBusUtil'

import AppModal from '@/components/AppModal.vue'
import IconPlay from '@/assets/icons/play.svg'
import IconPause from '@/assets/icons/pause.svg'

export default {
  components: {
    IconPlay,
    IconPause,
    AppModal
  },
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapState('albums', ['currentSong', 'isPlaying'])
  },
  methods: {
    toggleModal(status) {
      this.showModal = status
    },
    ...mapActions({
      selectSong: 'albums/selectSong',
      setPlayState: 'albums/setPlayState'
    }),
    isPlayingCurrentSong(song) {
      return song.file === this.currentSong.file && this.isPlaying
    },
    play(song) {
      this.selectSong(song).then(() => {
        EventBusUtil.$emit('audio-play-song', true)
      })
    },
    pause() {
      EventBusUtil.$emit('audio-play-song', false)
    }
  }
}
</script>

<style lang="postcss" scoped>
li {
  padding: 0.1em 0;
  border-bottom: 1px solid #ccc;
  display: flex;
}

.title {
  flex: 1 1 auto;
}

.button-wrapper {
  width: 1.5em;
}

.btn-pause,
.btn-play {
  height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
