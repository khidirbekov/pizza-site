import request from '@/utils/request'

export async function getPizzas() {
  const { data } = await request.get('/api/pizzas?limit=100')
  return data
}