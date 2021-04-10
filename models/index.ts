export interface AppState {
  pizzas: Pizza[]
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
