<template>
  <q-page class="column q-gutter-sm q-pa-md">
    <p class="text-h6 col-1 q-my-none">Only on Homeflix</p>
    <main-cards :movies="movies"></main-cards>
    <p class="text-subtitle1 col-1 q-my-none">Action Movies</p>
    <main-cards  :movies="romanticMovies"></main-cards>
    <p class="text-subtitle1 col-1 q-my-none">Animation Movies</p>
    <main-cards  :movies="animationMovies"></main-cards>
    <p class="text-subtitle1 col-1 q-my-none">Recommended Movies</p>
    <main-cards :movies="recommendedMovies"></main-cards>
  </q-page>
</template>

<script>
import { defineComponent,ref } from "vue";
import MainCards from "components/MainCards.vue";
import { useMovieStore } from "stores/Movie-store";
export default defineComponent({
  name: "IndexPage",
  components: { MainCards },
  setup(){
   const height=ref(0.5)
    const movies=ref([])
    const romanticMovies=ref([])
    const recommendedMovies = ref([])
    const animationMovies = ref([])
    return {
     height,
      movies,
      recommendedMovies,
      animationMovies,
      romanticMovies
    }
  },
  created() {
    let store = useMovieStore();
    store.getMovies().then((result)=>{
      this.movies=result.slice(0,8)
      result.forEach((movie)=>{
        if(movie.rating>6.0){
          this.recommendedMovies.push(movie)
        }
        if(movie.genre.includes('Action')){
          this.romanticMovies.push(movie)
        }
        if(movie.genre.includes('Animation')){
          this.animationMovies.push(movie)
        }
      })
    });
  }
});
</script>
