<template>
  <Splide :options="{
      type  : 'loop',
      perPage : 4,
      gap:'0.5em',
      focus  : 'center',
      heightRatio:height,
      perMove:1,
      arrows:false,
      lazyLoad: 'nearby',
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
  <q-dialog v-model="detailDialog" position="bottom">
    <movie-detail-component :single-movie="singleMovie"></movie-detail-component>
  </q-dialog>
</template>
<script>
import {Splide, SplideSlide} from '@splidejs/vue-splide';

import '@splidejs/vue-splide/css';
import {useMovieStore} from "stores/Movie-store";
import {ref} from "vue";
import MovieDetailComponent from "components/movieDetailComponent.vue";

export default {
  name: "MainCards",
  components: {
    MovieDetailComponent,
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
   const detailDialog = ref(false)
    const singleMovie = ref({})
    const spinner = ref(true)
    return {
      detailDialog,
      singleMovie,
      spinner,
      detail(id){
        store.getMovieDetails(id).then((movie)=> {
          console.log(movie)
          singleMovie.value = movie
          detailDialog.value = true
        })
      }
    };
  },
}
</script>

<style scoped>

</style>
