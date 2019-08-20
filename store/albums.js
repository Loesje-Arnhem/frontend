import albums from '@/data/albums.json'

export const state = () => ({
  list: albums,
  currentSong: albums[0].songlist.find(song => song.file !== undefined),
  isPlaying: false
})

export const getters = {
  playableSongs: () => {
    let newArray = []
    albums.forEach(album => {
      const songs = album.songlist.filter(song => song.file !== undefined)
      newArray = [...newArray, ...songs]
    })
    return newArray
  }
}

export const mutations = {
  selectSong: (state, payload) => {
    if (payload) state.currentSong = payload
  },
  setPlayState: (state, payload) => {
    state.isPlaying = payload
  }
}

export const actions = {
  selectSong({ commit }, payload) {
    const songs = getters.playableSongs()
    const song = songs.find(item => item.file === payload.file)
    commit('selectSong', song)
  },
  setPlayState: ({ commit }, payload) => {
    commit('setPlayState', payload)
  },
  selectNextSong({ commit }, currentSong) {
    const songs = getters.playableSongs()
    const currentSongIndex = songs.findIndex(song => song === currentSong)
    let nextSongIndex
    if (currentSongIndex + 1 >= songs.length) {
      nextSongIndex = 0
    } else {
      nextSongIndex = currentSongIndex + 1
    }
    commit('selectSong', songs[nextSongIndex])
  }
}
