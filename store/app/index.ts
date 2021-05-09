import { Module } from 'vuex'
import { AppState } from '../../models'
import { actions } from './actions';
import { mutations } from './mutations'
import { getters } from './getters'

const state: AppState = {
  pizzas: [],
  cities: [],
  city: 1,
  pizzerias: []
}

export const app: Module<AppState, unknown> = {
  namespaced: true,
  state: () => state,
  actions,
  mutations,
  getters
}
