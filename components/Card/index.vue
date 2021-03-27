<template>
  <vs-card class="card" type="4">
    <template #title>
      <h3>Pot with a plant</h3>
    </template>
    <template #img>
      <img src="https://vuesax.com/foto13.png" alt="" />
    </template>
    <template #text>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
    </template>
    <template #interactions>
      <vs-button danger icon>
        <i class="bx bx-heart"></i>
      </vs-button>
      <vs-button class="btn-chat" shadow primary>
        <i class="bx bx-chat"></i>
        <span class="span"> 54 </span>
      </vs-button>
    </template>
  </vs-card>
</template>

<style>

/** Баг с карточкой в сафари */
@media not all and (min-resolution:.001dpcm)
{ @supports (-webkit-appearance:none) {
  .vs-card-content.type-4 .vs-card__img img {
    transform: none;
  }
}}
</style>