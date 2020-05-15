export const state = () => ({
  list: [],
})

export const getters = {
  total: (state) => state.list.length,
  isInFavorites: (state) => (id) =>
    state.list.find((favorite) => favorite.id === id),
}

export const mutations = {
  add: (state, payload) => {
    state.list.push(payload)
  },
  remove: (state, payload) => {
    const list = [...state.list]
    state.list = list.filter((favorite) => favorite.id !== payload)
  },
}

export const actions = {
  add: ({ commit }, payload) => {
    commit('add', payload)
  },
  remove: ({ commit }, payload) => {
    commit('remove', payload)
  },
}
