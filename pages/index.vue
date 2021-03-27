<template>
    <div class="list">
      <card />
      <card />
      <card />
      <card />
      <card />
      <card />
      <card />
      <card />
    </div>
</template>

<script>
import Card from '~/components/Card'

export default {
  components: {
    Card
  },
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
