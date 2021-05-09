<template>
  <div class="container">
    <navbar />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Navbar from '~/components/Navbar/index.vue'
import {
  Component,
  Vue,
} from 'nuxt-property-decorator'
import '~/styles/global.css'

@Component({
  components: {
    Navbar
  }
})
export default class Default extends Vue {

}
</script>
