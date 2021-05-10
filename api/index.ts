import request from '@/utils/request'

export async function getPizzas() {
  const { data } = await request.get('/api/pizzas?limit=100')
  return data
}

export async function getCities() {
  const { data } = await request.get('/api/cities?limit=100')
  return data.items
}

export async function getPizzerias(cityId: number) {
  const { data } = await request.get(`/api/pizzerias?limit=100&city=${cityId}`)
  return data.items
}

export async function postPizzaGroup(pizzaGroup: any) { 
  const { data } = await request({
    url: '/api/pizza_groups',
    method: 'POST',
    data: {
      pizza: `/api/pizzas/${pizzaGroup.id}`,
      count: +pizzaGroup.count
    }
  })
  return data
}

export async function postOrder(order: any) {
  const { data } = await request({
    url: '/api/orders',
    method: 'POST',
    data: order
  })
  return data  
}

export async function getOrder(id: number) {
  const { data } = await request.get(`/api/orders/${id}`)
  return data
}

export async function putOrderConfirm(id: number, code: string) {
  const { data } = await request.put(`/api/orders/${id}/confirm`, {
    plainCode: code
  })
  return data
} 