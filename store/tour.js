import axios from '~/plugins/axios'

export const state = () => ({
  list: [],
  isLoading: false
})

export const mutations = {
  set: (state, payload) => {
    state.list = payload
  },
  updateLoader: (state, payload) => {
    state.isLoading = payload
  }
}

export const actions = {
  async set({ commit }) {
    commit('updateLoader', true)
    try {
      const response = await axios.get('site/v1/tours')
      if (response.data) commit('set', response.data)
    } finally {
      commit('updateLoader', false)
    }
  }
}
