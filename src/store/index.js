import { createStore } from 'vuex'
export default createStore({
  state: {
    breadListState: []
  },
  mutations: {
    breadListMutations (getters, list) {
      getters.breadListState = list
    }
  },
  actions: {
  },
  modules: {
  }
})
