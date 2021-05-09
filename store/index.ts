import Vue from 'vue'
import Vuex, { StoreOptions, Store } from 'vuex'
import { app } from './app'

Vue.use(Vuex)

const store: StoreOptions<any> = {
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('app/fetchCities')
    }
  },
  modules: {
    app
  }
}
type RootState = typeof store

export default () => new Store<RootState>(store)
