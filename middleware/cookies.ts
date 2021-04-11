import { Context } from "@nuxt/types"

export default async function ({ app, store }: Context) {
  const pizzas = app.$cookies.get('pizzas') || []
  store.commit('app/INIT_PIZZAS', pizzas)
}