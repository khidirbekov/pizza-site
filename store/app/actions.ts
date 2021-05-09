import { getCities, getPizzerias } from '../../api'

export const actions = {
  fetchCities: async (context) => {
    const data = await getCities()
    context.commit('SET_CITIES', data)
  },
  fetchPizzerias: async (context) => {
    const city = context.getters['getActiveCity']
    const data = await getPizzerias(city)
    context.commit('SET_PIZZERIAS', data)
  }
}