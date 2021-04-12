export const state = () => ({
  selectedTags: [],
  search: '',
  dateBefore: null,
  dateAfter: null,
})

export const getters = {
  isSelected: (state) => (tagId) => {
    return state.selectedTags.find(
      (selectedTag) => selectedTag.node.databaseId === tagId,
    )
  },
  selectedSourceIds: (state) => {
    const sources = state.selectedTags.filter(
      (tag) => tag.node.taxonomy.node.name === 'source',
    )
    return sources.map((subject) => subject.node.databaseId)
  },
  selectedSubjectIds: (state) => {
    const subjects = state.selectedTags.filter(
      (tag) => tag.node.taxonomy.node.name === 'subject',
    )
    return subjects.map((subject) => subject.node.databaseId)
  },
}

export const mutations = {
  search: (state, payload) => {
    state.search = payload
  },
  updateDateBefore: (state, payload) => {
    state.dateBefore = payload
  },
  updateDateAfter: (state, payload) => {
    state.dateAfter = payload
  },
  add: (state, payload) => {
    state.selectedTags.push(payload)
  },
  remove: (state, payload) => {
    const selectedTags = [...state.selectedTags]
    state.selectedTags = selectedTags.filter(
      (selectedTag) => selectedTag.node.databaseId !== payload,
    )
  },
}

export const actions = {
  search: ({ commit }, payload) => {
    commit('search', payload)
  },
  updatedateBefore: ({ commit }, payload) => {
    commit('updateDateBefore', payload)
  },
  updatedateAfter: ({ commit }, payload) => {
    commit('updateDateAfter', payload)
  },
  add: ({ commit }, payload) => {
    commit('add', payload)
  },
  remove: ({ commit }, payload) => {
    commit('remove', payload)
  },
}
