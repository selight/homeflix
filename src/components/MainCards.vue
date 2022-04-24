<template>
  <div class="row q-gutter-md" v-if="movies.length===0">
  <q-card style=" min-height:150px;" v-for="n in 4" :key="n" class="col">
  <q-skeleton style="min-height:150px;" />
  </q-card>
  </div>
  <Splide :options="{
      type  : 'loop',
      perPage : 4,
      gap:'0.5em',
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
      <div>
      <img alt="movie" style="display: flex; width: 100%; height: 100%" data-splide-lazy="" :src="movie.poster"  v-on:click="detail(movie.id,i)"/>
        <q-spinner-ball v-if="spinners[i]" size="3em" style="position: absolute;top: 35%;left: 30%;"></q-spinner-ball>
      </div>
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
import {ref, watch} from "vue";
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
    },
  },
  setup(props) {
   const store = useMovieStore();
   const detailDialog = ref(false)
    const singleMovie = ref({})
    const spinners = ref([])
    watch(()=>props.movies, () => {
    spinners.value=Array(props.movies.length).fill(false)
    },{deep:true});
    return {
      detailDialog,
      singleMovie,
      spinners,
      detail(id,i){
        spinners.value.splice(i,1,true);
        store.getMovieDetails(id).then((movie)=> {
          spinners.value.splice(i,1,false);
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
