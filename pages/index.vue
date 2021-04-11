<template>
    <div class="list">
      <no-ssr>
      <card :key="pizza.id" v-for="pizza in pizzas" :data="pizza" />
      </no-ssr>
    </div>
</template>

<script lang="ts">
import Card from '~/components/Card/index.vue'

import {
  Component,
  Vue,
} from 'nuxt-property-decorator'
import { Pizza } from '~/models'
import { getPizzas } from '~/api'
import { Context } from '@nuxt/types'


@Component({
  components: {
    Card,
  }
})
export default class Index extends Vue {
  isOpen: boolean = false
  pizzas: Pizza[] = []

  async asyncData() {
    const pizzas = await getPizzas()
    return { 
      pizzas: pizzas.items,
      countOfPages: pizzas.countOfPages
    }
  }
}
</script>

<style scoped>
.list {
  padding: 1rem;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(auto-fit, 300px);
  gap: 20px;
}
</style>
