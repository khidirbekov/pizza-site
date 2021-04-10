<template>
  <vs-card shadow  class="card" type="4">
    <template #title>
      <h3>{{ data.name }}</h3>
    </template>
    <template #img>
      <img :src="baseUrl + data.image.path" alt="" />
    </template>
    <template #text>
      <p class="description">{{ data.description }}</p>
    </template>
    <template #interactions>
      <vs-button v-if="isInCart" @click="handlePizza" border :active="false" icon>
        <!-- <i class='bx bxs-cart-minus' ></i> -->
        <i class='bx bx-minus-circle'></i>
      </vs-button>
      <vs-button v-else @click="handlePizza" gradient icon>
        <i class='bx bxs-cart-add' ></i>
      </vs-button>
      <vs-button class="btn-chat" transparent active warning>
        <span class="span"> {{ data.price }} </span>
        <i class='bx bx-ruble'></i>
      </vs-button>
    </template>
  </vs-card>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'
import { Pizza } from '~/models'
import { isContain } from '@/utils/isContain'

@Component
export default class Card extends Vue {
  @Prop({ required: true }) data!: Pizza
  baseUrl: string = `${process.env.baseURL}/uploads/`
  pizzas: Pizza[] = []

  get isInCart() {
    const pizzas = this.$store.getters["app/getPizzas"]
    return isContain(pizzas, this.data)
    // return true
  }

  handlePizza() {
    this.$store.commit('app/SET_PIZZAS', this.data)
  }
}
</script>

<style>
.vs-card__text {
  width: 100%;
}

.vs-card, .btn-chat {
  cursor: default;
}

.vs-card .vs-button--border:focus {
  color: rgb(var(--vs-primary));
  background: none;
}

.description {
  overflow: hidden;
  height: 64px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: -o-ellipsis-lastline;
  width: 100%;
}

/** Баг с карточкой в сафари */
@media not all and (min-resolution: 0.001dpcm) {
  @supports (-webkit-appearance: none) {
    .vs-card-content.type-4 .vs-card__img img {
      transform: none;
    }
  }
}
</style>
