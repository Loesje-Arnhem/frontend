export const state = () => ({
  list: []
})

export const getters = {
  total: state => state.list.length,
  isInFavorites: state => slug =>
    state.list.find(favorite => favorite.slug === slug)
}

export const mutations = {
  /* eslint-disable no-param-reassign */
  toggle: (state, payload) => {
    if (state.list.findIndex(favorite => favorite.id === payload.id) > -1) {
      state.list = state.list.filter(favorite => favorite.id !== payload.id)
    } else {
      state.list.push(payload)
    }
  }
}

export const actions = {
  toggle: ({ commit }, payload) => {
    commit('toggle', payload)
  }
}
