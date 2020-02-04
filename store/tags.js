export const state = () => ({
  selectedTags: []
})

export const getters = {
  selectedTags: state => state.selectedTags,
  selectedTagByTagId: state => tagId =>
    state.selectedTags.find(tag => tag.tagId === tagId),
  selectedSources: state =>
    state.selectedTags.filter(tag => tag.taxonomy.name === 'source'),
  selectedSubjects: state =>
    state.selectedTags.filter(tag => tag.taxonomy.name === 'subject')
}

export const mutations = {
  addTag: (state, payload) => {
    if (!state.selectedTags.includes(payload)) state.selectedTags.push(payload)
  },
  removeTag: (state, payload) => {
    state.selectedTags.filter(tag => tag !== payload)
  },
  toggle: (state, payload) => {
    if (state.selectedTags.includes(payload)) {
      state.selectedTags = state.selectedTags.filter(tag => tag !== payload)
    } else {
      mutations.addTag(state, payload)
    }
  }
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
  }
}
