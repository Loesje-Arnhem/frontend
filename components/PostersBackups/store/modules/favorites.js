const moduleState = {
  list: [],
}

const getters = {
  total: (state) => state.list.length,
  isInFavorites: (state) => (posterId) => {
    window.console.log(posterId)
    return state.list.find((favorite) => favorite.posterId === posterId)
  },
}

const mutations = {
  toggle: (state, payload) => {
    if (
      state.list.findIndex(
        (favorite) => favorite.posterId === payload.posterId,
      ) > -1
    ) {
      state.list = state.list.filter(
        (favorite) => favorite.posterId !== payload.posterId,
      )
    } else {
      state.list.push(payload)
    }
  },
}

const actions = {
  toggle: ({ commit }, payload) => {
    commit('toggle', payload)
  },
}

export default {
  state: moduleState,
  getters,
  mutations,
  actions,
  namespaced: true,
}
