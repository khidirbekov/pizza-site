<template>
  <vs-navbar
    class="container navbar"
    color="blue"
    v-model="active"
    shadow
  >
    <template #left>
      <h1>Pizza</h1>
    </template>
    <vs-navbar-item :active="active == 'guide'" id="guide">
      Guide
    </vs-navbar-item>
    <vs-navbar-item :active="active == 'docs'" id="docs">
      Documents
    </vs-navbar-item>
    <vs-navbar-item :active="active == 'components'" id="components">
      Components
    </vs-navbar-item>
    <vs-navbar-item :active="active == 'license'" id="license">
      license 
    </vs-navbar-item>
    <template #right>
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
export default Vue.extend({
  data() {
    return {
      active: 'guide',
      isDark: false
    }
  },
  methods: {
    changeTheme() {
      if (this.isDark) {
        document.body.setAttribute('vs-theme', 'dark')
      } else {
        document.body.removeAttribute('vs-theme')
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.navbar {
  position: relative;
  padding: .7rem;
}
</style>
