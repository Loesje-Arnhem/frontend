export const state = () => ({
  selectedTags: [],
})

export const getters = {
  selectedSources: (state) =>
    state.selectedTags.filter((tag) => tag.taxonomy === 'source'),
  selectedSubjects: (state) =>
    state.selectedTags.filter((tag) => tag.taxonomy === 'subject'),
  isSelected: (state) => (tagId) =>
    state.selectedTags.find((tag) => tag.id === tagId),
}

export const mutations = {
  toggle: (state, payload) => {
    const isSelected = state.selectedTags.find((tag) => tag.id === payload.id)
    if (isSelected) {
      const selectedTags = [...state.selectedTags]
      state.selectedTags = selectedTags.filter((tag) => {
        return tag.id !== payload.id
      })
    } else {
      state.selectedTags.push(payload)
    }
  },
}

export const actions = {
  toggle: ({ commit }, payload) => {
    commit('toggle', payload)
  },
}
