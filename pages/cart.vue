<template>
  <div class="cart-container">
    <div v-if="pizzas.length">
      <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th> Пицца </vs-th>
            <vs-th> Описание </vs-th>
            <vs-th> Цена </vs-th>
            <vs-th> Действия </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="i" v-for="(tr, i) in pizzas" :data="tr">
            <vs-td>
              <div class="imageWrapper">
                <img class="image" :src="fileUrl + tr.image.path" alt="pizza" />
                {{ tr.name }}
              </div>
            </vs-td>
            <vs-td>
              {{ tr.description }}
            </vs-td>
            <vs-td>
              {{ tr.price }}
            </vs-td>
            <vs-td>
              <vs-button danger border @click="() => remove(tr.id)">
                Удалить
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-button relief size="large"> Оформить заказ </vs-button>
        </template>
      </vs-table>
    </div>
    <div v-else>
      Вы не выбрали пиццу
      <vs-button to="/">Выбрать</vs-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component
export default class Cart extends Vue {
  fileUrl: string = process.env.baseURL + '/uploads/'

  get pizzas() {
    return this.$store.getters['app/getPizzas']
  }

  remove(id: number) {
    this.$store.commit('app/REMOVE_PIZZA', id)
  }
}
</script>

<style scoped>
.cart-container {
  padding: 20px 40px;
}

.image {
  width: 120px;
  border-radius: 1.3rem;
  padding-right: 6px;
}

.imageWrapper {
  display: flex;
  align-items: center;
}
</style>
