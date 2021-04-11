import { Module } from 'vuex'
import { AppState } from '../../models'
import { mutations } from './mutations'
import { getters } from './getters'

const state: AppState = {
  pizzas: [],
}

export const app: Module<AppState, unknown> = {
  namespaced: true,
  state: () => state,
  mutations,
  getters
}
