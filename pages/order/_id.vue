<template>
  <div class="content">
    <h2 class="title">Ваш заказ №{{ order.id }}</h2>
    <vs-alert v-if="order.isConfirm" success gradient>
      <template #title> Заказ {{ PIZZA_STATUS[order.status] }} </template>
      {{ order.status === 'created' ? 'Скоро мы примем ваш заказ' : '' }}
      {{
        order.status === 'active' ? 'Мы приняли ваш заказ, выполняем :)' : ''
      }}
      {{ order.status === 'completed' ? 'Заказ готов!' : '' }}
    </vs-alert>
    <vs-alert v-else danger gradient>
      <template #title>Необходимо подтвердить заказ</template>
      Введите код, который мы отправили по смс
      <vs-row>
        <vs-input v-model="code" placeholder="Код" />
        <vs-button @click="() => confirmOrder(order.id)" style="padding: 2px"> Подтвердить </vs-button>
      </vs-row>
    </vs-alert>

    <div>
      <p><i class="bx bxs-user"></i> {{ order.customer }}</p>
    </div>
    <div>
      <p><i class="bx bxs-phone"></i> {{ order.phone }}</p>
    </div>
    <div>
      <p>
        <i class="bx bx-calendar"></i>
        {{ dayjs(order.dateCreate).format('HH:mm DD.MM.YYYY') }}
      </p>
    </div>
    <div>
      <p><i class="bx bxs-city"></i> {{ order.pizzeria.city.name }}</p>
    </div>
    <div>
      <p>
        <i class="bx bxs-pizza"></i> {{ order.pizzeria.name }},
        {{ order.pizzeria.address }}
      </p>
    </div>
    <div>
      <p><strong>Состав</strong></p>
      <vs-table striped>
        <template #thead>
          <vs-tr>
            <vs-th> Название </vs-th>
            <vs-th> Количество </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="i" v-for="(tr, i) in order.pizzaGroups" :data="tr">
            <vs-td class="pizza">
              <img
                class="img"
                :src="`${baseURL}/uploads/${tr.pizza.image.path}`"
                alt="pizza"
              />
              {{ tr.pizza.name }}
            </vs-td>
            <vs-td>
              {{ tr.count }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <span
        ><strong>Сумма</strong> {{ order.summaryPrice }}
        <i class="bx bx-ruble"></i>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import Hashkit from 'hashkit'
import { Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { getOrder, putOrderConfirm } from '~/api'
import { PIZZA_STATUS, CRYPT_KEY } from '@/constants'

@Component
export default class Order extends Vue {
  PIZZA_STATUS = PIZZA_STATUS
  baseURL = process.env.baseURL
  dayjs = dayjs
  code = ''

  async confirmOrder(id: number) {
    try {
      const response = await putOrderConfirm(id, this.code)
      // @ts-ignore
      this.order = response
      // @ts-ignore
      this.$vs.notification({
        flat: true,
        color: 'success',
        position: 'top-right',
        title: 'Ваш заказ подтвержден',
        text: 'Вы получите смс, как пицца будет готова',
      })
    } catch (e) { 
      // @ts-ignore
      this.$vs.notification({
        flat: true,
        color: 'danger',
        position: 'top-right',
        title: 'Произошла ошибка',
        text: e.response.data.detail,
      })
    }

  }

  async asyncData({ route, error }: Context) {
    const hashkit = new Hashkit(CRYPT_KEY)
    const id = +hashkit.decode(route.params.id)
    try {
      const order = await getOrder(id)
      return {
        order,
      }
    } catch (e) {
      error({
        statusCode: e.response.status,
      })
    }
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  max-width: 750px;
  margin: 45px auto;
  padding: 40px 40px 60px;
  background: rgb(var(--vs-gray-1));
  box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, var(--vs-shadow-opacity));
  border-radius: 15px;
}

.title {
  text-align: center;
}

p {
  margin: 10px 0;
}

.img {
  width: 45px;
  object-fit: contain;
  margin-right: 6px;
}

.pizza {
  display: flex;
  align-items: center;
}
</style>
