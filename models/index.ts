export interface AppState {
  pizzas: Pizza[]
  cities: City[]
  city: number
  pizzerias: Pizzeria[]
}

interface BaseEntity {
  id: number
  dateCreate: string
  dateUpdate: string
}

export interface Pizza extends BaseEntity {
  name: string
  description: string
  price: number
  image: File
}

export interface File extends BaseEntity {
  name: string
  path: string
}

export interface City extends BaseEntity {
  name: string
  latitude: string
  longitude: string
}

export interface Pizzeria extends BaseEntity {
  city: City
  address: string
  name: string
}