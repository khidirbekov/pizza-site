import { MutationTree } from 'vuex'
import { Pizza } from '../../models'
import { AppState } from '../../models'
import { isContain } from '../../utils/isContain'
import  cookies from 'js-cookie'

export const mutations: MutationTree<AppState> = {
  SET_PIZZAS: (state: AppState, pizza: Pizza
    ) => {
      if (isContain(state.pizzas, pizza)) {
        state.pizzas = state.pizzas.filter(p => p.id !== pizza.id)
      } else {
        state.pizzas.push(pizza)
      }
      cookies.set('pizzas', JSON.stringify(state.pizzas))
  },
  REMOVE_PIZZA: (state: AppState, id: number) => {
    state.pizzas = state.pizzas.filter(pizza => pizza.id !== id)
    cookies.set('pizzas', JSON.stringify(state.pizzas))
  },
  INIT_PIZZAS: (state: AppState, pizzas: Pizza[]) => {
    state.pizzas = pizzas
  }
}
