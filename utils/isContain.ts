interface Entity {
  id: number
  [k: string]: any
}

export function isContain(list: Entity[], toFind: Entity) {
  return list.some(element => element.id === toFind.id)
}
