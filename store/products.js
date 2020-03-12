export const state = () => ({
  list: [],
})

export const getters = {
  total: state => state.list.length,
  isInFavorites: state => posterId =>
    state.list.find(favorite => favorite.posterId === posterId),
}

export const mutations = {
  /* eslint-disable no-param-reassign */
  toggle: (state, payload) => {
    if (
      state.list.findIndex(favorite => favorite.posterId === payload.posterId) >
      -1
    ) {
      state.list = state.list.filter(
        favorite => favorite.posterId !== payload.posterId,
      )
    } else {
      state.list.push(payload)
    }
  },
}

export const actions = {
  toggle: ({ commit }, payload) => {
    commit('toggle', payload)
  },
}
