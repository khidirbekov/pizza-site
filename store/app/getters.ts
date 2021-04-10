import { AppState } from "../../models"

export const getters = {
  getPizzas: (state: AppState) => {
    return state.pizzas
  }
}