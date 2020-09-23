export const state = () => ({
  list: [],
})

export const getters = {
  total: (state) => state.list.length,
  isInFavorites: (state) => (id) =>
    state.list.findIndex((favorite) => favorite.node.id === id) > -1,
}

export const mutations = {
  add: (state, payload) => {
    state.list.push(payload)
  },
  remove: (state, payload) => {
    const list = [...state.list]
    state.list = list.filter((favorite) => favorite.node.id !== payload)
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
