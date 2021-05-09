import { Context } from "@nuxt/types"

export default async function ({ app, store }: Context) {
  const pizzas = app.$cookies.get('pizzas') || []
  const city = +app.$cookies.get('city') || 1
  store.commit('app/INIT_PIZZAS', pizzas)
  store.commit('app/INIT_CITY', city)
  await store.dispatch('app/fetchPizzerias')
}