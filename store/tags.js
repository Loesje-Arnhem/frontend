export const state = () => ({
  sources: [],
  subjects: [],
})

export const getters = {
  isSelected: (state) => (tagId, taxonomy) => {
    if (taxonomy === 'source') {
      return state.sources.includes(tagId)
    } else {
      return state.subjects.includes(tagId)
    }
  },
}

export const mutations = {
  addSubject: (state, payload) => {
    state.subjects.push(payload)
  },
  removeSubject: (state, payload) => {
    const subjects = [...state.subjects]
    state.subjects = subjects.filter((tag) => {
      return tag !== payload
    })
  },
  addSource: (state, payload) => {
    state.sources.push(payload)
  },
  removeSource: (state, payload) => {
    const sources = [...state.sources]
    state.sources = sources.filter((tag) => {
      return tag !== payload
    })
  },
}

export const actions = {
  addSubject: ({ commit }, payload) => {
    commit('addSubject', payload)
  },
  removeSubject: ({ commit }, payload) => {
    commit('removeSubject', payload)
  },
  addSource: ({ commit }, payload) => {
    commit('addSource', payload)
  },
  removeSource: ({ commit }, payload) => {
    commit('removeSource', payload)
  },
}
