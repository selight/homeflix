<template>
  <q-page class="column q-gutter-sm q-pa-md">
    <p class="text-h6 col-1 q-my-none">Only on Homeflix</p>
   <main-cards></main-cards>
    <p class="text-subtitle1 col-1 q-my-none">Romantic Movies</p>
      <main-cards height="0.5"></main-cards>
    <p class="text-subtitle1 col-1 q-my-none">Movies based on real life</p>
    <main-cards height="0.5"></main-cards>
    <p class="text-subtitle1 col-1 q-my-none">Recommended Movies</p>
    <main-cards height="0.5"></main-cards>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import MainCards from "components/MainCards.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {MainCards}
})
</script>
