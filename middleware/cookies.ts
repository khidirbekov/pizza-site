import { Context } from "@nuxt/types"

export default function ({ app, store }: Context) {
  const pizzas = app.$cookies.get('pizzas')
  store.commit('app/INIT_PIZZAS', pizzas)
}