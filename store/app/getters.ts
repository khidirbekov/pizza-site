import { AppState } from "../../models"

export const getters = {
  getPizzas: (state: AppState) => state.pizzas,
  getCities: (state: AppState) => state.cities,
  getActiveCity: (state: AppState) => state.city,
  getPizzerias: (state: AppState) => state.pizzerias
}