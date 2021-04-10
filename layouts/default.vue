<template>
  <div class="container">
    <navbar />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '~/components/Navbar/index.vue'
import '~/styles/global.css'

export default Vue.extend({
  components: {
    Navbar
  }
})
</script>
