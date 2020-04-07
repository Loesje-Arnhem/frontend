export const state = () => ({
  selectedTags: [],
})

export const getters = {
  selectedTags: (state) => state.selectedTags,
  selectedSources: (state) =>
    state.selectedTags.filter((tag) => tag.taxonomy === 'source'),
  selectedSubjects: (state) =>
    state.selectedTags.filter((tag) => tag.taxonomy === 'subject'),
}

export const mutations = {
  addTag: (state, payload) => {
    if (!state.selectedTags.includes(payload)) state.selectedTags.push(payload)
  },
  removeTag: (state, payload) => {
    state.selectedTags.filter((tag) => tag !== payload)
  },
  toggle: (state, payload) => {
    if (state.selectedTags.includes(payload)) {
      state.selectedTags = state.selectedTags.filter((tag) => tag !== payload)
    } else {
      mutations.addTag(state, payload)
    }
  },
}

export const actions = {
  addTag: ({ commit }, payload) => {
    commit('addTag', payload)
  },
  remoteTag: ({ commit }, payload) => {
    commit('remoteTag', payload)
  },
  toggle: ({ commit }, payload) => {
    commit('toggle', payload)
  },
}
