import { City, Pizzeria } from './../../models/index';
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
  },
  INIT_CITY: (state: AppState, id) => {
    state.city = id
  },
  SET_CITIES: (state: AppState, cities: City[]) => {
    state.cities = cities
  },
  SET_ACTIVE_CITY: (state: AppState, id: number) => {
    state.city = id
    cookies.set('city', `${id}`)
  },
  SET_PIZZERIAS: (state: AppState, pizzerias: Pizzeria[]) => {
    state.pizzerias = pizzerias
  },
  RESET_CART: (state: AppState) => {
    state.pizzas = []
    cookies.set('pizzas', JSON.stringify([]))
  }
}
