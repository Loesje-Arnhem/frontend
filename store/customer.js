export const state = () => ({
  customer: [],
})

export const mutations = {
  add: (state, payload) => {
    state.customer = payload
  },
}

export const actions = {
  add: ({ commit }, payload) => {
    commit('add', payload)
  },
}
