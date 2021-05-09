<template>
  <div>
    <div class="container notFound" v-if="error.statusCode === 404">
      <h1>Страница не найдена</h1>
      <img src="~/assets/not_found.svg" />
    </div>
    <h1 v-else>An error occurred</h1>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>

<style scoped>
  .notFound {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
    flex-wrap: wrap;
  }

  .notFound img {
    width: 300px;
  }
</style>