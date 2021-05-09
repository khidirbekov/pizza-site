<template>
  <vs-navbar
    class="container navbar"
    color="blue"
    shadowScroll
    centerCollapsed
    shadow
    notLine
  >
    <template #left>
      <img src="~/assets/logo.svg" class="logo" alt="logo" />
    </template>
    <template #default>
      <vs-navbar-item to="/" :active="$route.name === 'index'"> Главная </vs-navbar-item>
      <vs-navbar-item to="/cart" :active="$route.name === 'cart'" class="cart-link">
        Корзина
        <no-ssr>
          <vs-button
            circle
            icon
            active
            flat
            class="cart-icon"
            :style="amountCartItems ? 'opacity: 1' : 'opacity: 0'"
          >
            {{ amountCartItems }}
          </vs-button>
        </no-ssr>
      </vs-navbar-item>
    </template>
    <template #right>
      <i class='bx bxs-city'></i>
      <vs-select
        @change="changeCity"
        class="city-select"
        v-model="city"
        :key="citiesKey"
      >
        <vs-option v-for="c in cities" :key="c.id" :label="c.name" :value="c.id">
          {{ c.name }}
        </vs-option>
      </vs-select>
      <vs-switch dark v-model="isDark" @change="changeTheme">
        <template #off>
          <i class="bx bxs-moon"></i>
        </template>
        <template #on>
          <i class="bx bxs-sun"></i>
        </template>
      </vs-switch>
    </template>
  </vs-navbar>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { City } from '~/models'

// import { extends } from '~/commitlint.config'
@Component
export default class Navbar extends Vue {
  isDark: boolean = false
  city: number = 1
  cities: City[] = []
  citiesKey: number = new Date().getTime()

  get amountCartItems() {
    return this.$store.getters['app/getPizzas'].length
  }

  changeCity(id: number) {
    this.$store.commit('app/SET_ACTIVE_CITY', id)
    this.$store.dispatch('app/fetchPizzerias')
  }

  changeTheme() {
    if (this.isDark) {
      document.body.setAttribute('vs-theme', 'dark')
    } else {
      document.body.removeAttribute('vs-theme')
    }
  }

  mounted() {
    this.cities = this.$store.getters['app/getCities']
    this.city = this.$store.getters['app/getActiveCity']
    this.citiesKey = new Date().getTime()
  }
}
</script>

<style lang="postcss" scoped>
.navbar {
  position: relative;
  padding: 0.7rem;
}

.city-select {
  margin-right: 8px;
  margin-left: 5px;
}

.logo {
  width: 90px;
}

.cart-link {
  position: relative;
}

.cart-icon {
  position: absolute;
  top: 1px;
  right: -30px;
  margin-bottom: 0;
  margin-top: 0;
  padding: 0.1rem 0.3rem;
}
.vs-navbar__item.active {
  position: relative;
}

button.vs-navbar__item.active::after {
  position: absolute;
  bottom: -0.9rem;
  display: block;
  content: '';
  width: 2rem;
  border-radius: 20%;
  height: 0.2rem;
  background: rgb(var(--vs-text));
  left: 50%;
  transform: translateX(-50%);
}
</style>
