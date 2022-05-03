<template>
  <q-page v-if="!newUser" class="column q-gutter-sm q-pa-md">
    <p class="text-h6 col-1 q-my-none">My Homeflix</p>
    <main-cards :movies="movies"></main-cards>
    <div v-for="(cat, i) in categories" :key="i">
      <p :id="cat" class="text-subtitle1">{{ cat }} Movies</p>
      <main-cards :movies="getByCategory(cat)"></main-cards>
    </div>
  </q-page>
  <q-page v-if="newUser" class="flex flex-center">
    <add-movie-component></add-movie-component>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import MainCards from "components/MainCards.vue";
import { useMovieStore } from "stores/Movie-store";
import AddMovieComponent from "components/addMovieComponent.vue";
import {useRoute, useRouter} from "vue-router";
export default defineComponent({
  name: "IndexPage",
  components: { MainCards, AddMovieComponent },
  setup() {
    const height = ref(0.5);
    const movies = ref([]);
    const categories = ref([]);
    const romanticMovies = ref([]);
    const recommendedMovies = ref([]);
    const animationMovies = ref([]);
    const router = useRouter();
    const route = useRoute();
    const newUser = ref(false);
    return {
      height,
      movies,
      categories,
      recommendedMovies,
      animationMovies,
      romanticMovies,
      newUser,
      router,
      route,
      getByCategory(category) {
        let result = [];
        movies.value.forEach((movie) => {
          if (movie.genre.includes(category)) {
            result.push(movie);
          }
        });
        return result;
      },
    };
  },
  created() {
    let movieStore = useMovieStore();
    movieStore.$state.edit = false;
    movieStore.getMyMovies().then((result) => {
      if (result.length === 0) {
        this.newUser = true;
      } else {
        this.movies = result;
        result.forEach((movie) => {
          if (
            !this.categories.includes(movie.genre[0]) &&
            movie.genre.length !== 0
          ) {
            this.categories.push(movie.genre[0]);
          }
        });
        movieStore.$state.categories = this.categories;
      }
    }).catch((errorStatus)=>{
      console.log(errorStatus)
      this.router.push({
        name: "SignIn",
        query: {
          ...this.route.query,
        },
      });
    });
  },
});
</script>
