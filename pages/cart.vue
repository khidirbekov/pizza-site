<template>
  <div class="cart-container">
    <div v-if="pizzas.length">
      <vs-table v-model="table">
        <template #thead>
          <vs-tr>
            <vs-th> Пицца </vs-th>
            <vs-th> Описание </vs-th>
            <vs-th width='100'> Цена </vs-th>
            <vs-th width='100'> Количество </vs-th>
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
              <i class="bx bx-ruble"></i>
            </vs-td>
            <vs-td>
              <vs-input class='count-input' @change="calcSum" type="number" v-model="tr.count" />
            </vs-td>
            <vs-td>
              <vs-button danger border @click="() => remove(tr.id)">
                Удалить
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          Стоимость заказа: {{ sum }} <i class="bx bx-ruble"></i>
          <vs-button gradient size="large" @click="openDialog">
            Оформить заказ
          </vs-button>
        </template>
      </vs-table>
      <vs-dialog blur v-model="isOpen">
        <template #header>
          <h4 class="not-margin">Оформить заказ</h4>
        </template>

        <div class="con-form">
          <vs-input
            class="field"
            block
            v-model="form.customer"
            label-placeholder="ФИО"
          />
          <vs-input
            class="field"
            block
            v-model="form.phone"
            v-mask="'+7 (###) ###-##-##'"
            label-placeholder="Телефон"
          />
          <vs-select
            block
            label-placeholder="Пиццерия"
            class="city-select field"
            v-model="form.pizzeria"
            :key="pizzeriaKey"
          >
            <vs-option
              v-for="pizzeria in $store.getters['app/getPizzerias']"
              :key="pizzeria.id"
              :label="pizzeria.name"
              :value="pizzeria.id"
            >
              <div>
                <strong>{{ pizzeria.name }}</strong>
                <br />
                {{ pizzeria.address }}
              </div>
            </vs-option>
          </vs-select>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button
              :upload="loading"
              :flat="loading"
              @click="createOrder"
              size="large"
              block
            >
              Заказать
            </vs-button>
          </div>
        </template>
      </vs-dialog>
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
import { Pizza } from '~/models'
import { postOrder, postPizzaGroup } from '~/api'
import Hashkit from 'hashkit'
import { CRYPT_KEY } from '@/constants'

@Component
export default class Cart extends Vue {
  fileUrl: string = process.env.baseURL + '/uploads/'
  table = []
  sum: number = 0
  pizzeriaKey: number = new Date().getTime()
  isOpen: boolean = false
  form = {
    customer: '',
    phone: '',
    pizzeria: '',
  }
  loading: boolean = false

  get pizzas() {
    return this.$store.getters['app/getPizzas'].map((pizza: Pizza) => ({
      ...pizza,
      count: 1,
    }))
  }

  mounted() {
    this.calcSum()
    this.pizzeriaKey = new Date().getTime()
  }

  remove(id: number) {
    this.$store.commit('app/REMOVE_PIZZA', id)
    this.calcSum()
  }

  calcSum() {
    // @ts-ignore
    const pizzaGroups = this.$vs.checkAll(this.table, this.pizzas)
    this.sum = pizzaGroups.reduce(
      (acc: number, cur: any) => acc + +cur.count * cur.price,
      0
    )
  }

  openDialog() {
    this.isOpen = true
  }

  isValid() {
    return Object.values(this.form).every(value => {
      console.log(value)
      return !!value
    })
  }

  async createOrder() {
    if (this.isValid()) {
      this.loading = true
      // @ts-ignore
      const pizzas = this.$vs.checkAll(this.table, this.pizzas)
      const pizzaGroups = (
        await Promise.all(
          pizzas.map(
            async (pizzaGroup: any) => await postPizzaGroup(pizzaGroup)
          )
        )
      ).map((pizzaGroup: any) => `/api/pizza_groups/${pizzaGroup.id}`)
      const form = {
        ...this.form,
        pizzeria: `/api/pizzerias/${this.form.pizzeria}`,
        pizzaGroups,
        summaryPrice: `${this.sum}`,
      }
      const data = await postOrder(form)
      this.loading = false
      this.isOpen = false
      const hashkit = new Hashkit(CRYPT_KEY)
      const cryptedId = hashkit.encode(data.id)
      this.$store.commit('app/RESET_CART')
      this.$router.push(`/order/${cryptedId}`)
    } else {
      // @ts-ignore
      this.$vs.notification({
            flat: true,
            color: 'danger',
            position: 'top-right',
            title: 'Произошла ошибка',
            text: 'Для оформления заказа заполните все поля'
          })
    }
  }
}
</script>

<style scoped>
.field {
  margin: 20px auto;
}

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

.vs-button--flat:focus {
  background: rgba(var(--vs-color), 0.15);
}

.vs-table__thead .vs-table__th {
  width: 100px !important;
}
</style>

<style>
.count-input [class=vs-input] {
  width: 100px;
}
</style>