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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
</style>
