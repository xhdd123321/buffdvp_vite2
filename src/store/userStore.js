import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let breadListState = []
  function setBreadListState (newValue) {
    breadListState = newValue
  }
  function getBreadListState () {
    return breadListState
  }
  return { breadListState, setBreadListState, getBreadListState }
})
