<template>
  <Splide :options="{
      type  : 'loop',
      perPage : 4,
      gap:'0.5em',
      focus  : 'center',
      heightRatio:height,
      perMove:1,
      arrows:false,
      pagination:false,
        breakpoints: {
		500: {
			perPage: 2,
		},
  }
    }" aria-label="My Favorite Images">
    <SplideSlide v-for="(movie,i) in movies" :key="i">
      <img alt="movie" style="display: flex; width: 100%; height: 100%" :src="movie.poster" v-on:click="detail(movie.id)"/>
    </SplideSlide>
  </Splide>
</template>
<script>
import {Splide, SplideSlide} from '@splidejs/vue-splide';

import '@splidejs/vue-splide/css';
import {useMovieStore} from "stores/Movie-store";

export default {
  name: "MainCards",
  components: {
    Splide,
    SplideSlide
  },
  props: {
    height: {
      type: Number,
    },
    movies :{
      type: Array,
    }
  },
  setup() {
   const store = useMovieStore();
    return {
      detail(id){
        store.getMovieDetails(id)
      }
    };
  },
}
</script>

<style scoped>

</style>
