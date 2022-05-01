<template>
  <div class="row q-gutter-md" v-if="movies.length === 0">
    <q-card style="min-height: 150px" v-for="n in 4" :key="n" class="col">
      <q-skeleton style="min-height: 150px" />
    </q-card>
  </div>
  <Splide
    :options="{
      type: 'slide',
      perPage: 4,
      gap: '0.5em',
      heightRatio: 0.4,
      perMove: 1,
      arrows: false,
      pagination: false,
    }"
    aria-label="My Favorite Images"
  >
    <SplideSlide v-for="(movie, i) in movies" :key="i">
      <div>
        <img
          alt="movie"
          data-splide-lazy="~assets/netflix.png"
          style="display: flex; width: 100%; height: 100%"
          :src="movie.poster"
          v-on:click="detail(movie._id, i)"
        />
        <q-spinner
          v-if="spinners[i]"
          size="3em"
          style="position: absolute; top: 35%; left: 30%"
        ></q-spinner>
      </div>
    </SplideSlide>
  </Splide>
  <q-dialog v-model="detailDialog" position="bottom">
    <movie-detail-component
      :single-movie="singleMovie"
    ></movie-detail-component>
  </q-dialog>
</template>
<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";

import "@splidejs/vue-splide/css";
import { useMovieStore } from "stores/Movie-store";
import { ref } from "vue";
import MovieDetailComponent from "components/movieDetailComponent.vue";

export default {
  name: "MainCards",
  components: {
    MovieDetailComponent,
    Splide,
    SplideSlide,
  },
  props: {
    height: {
      type: Number,
    },
    movies: {
      type: Array,
    },
  },
  setup() {
    const movieStore = useMovieStore();
    const detailDialog = ref(false);
    const singleMovie = ref({});
    const spinners = ref(Array(20).fill(false));
    const setWidth = ref("");
    //TODO make the number of spinners based on the movies length. i.e deep watch isn't working
    // watch(
    //   () => props.movies,
    //   () => {
    //     spinners.value = Array(props.movies.length).fill(false);
    //   },
    //   { deep: true }
    // );
    return {
      detailDialog,
      singleMovie,
      spinners,
      setWidth,
      detail(id, i) {
        spinners.value.splice(i, 1, true);
        movieStore.getMyMovieDetails(id).then((movie) => {
          spinners.value.splice(i, 1, false);
          singleMovie.value = movie;
          detailDialog.value = true;
        });
      },
    };
  },
  created() {
    if (this.movies.length < 2) {
      this.setWidth = "width:100px;";
    }
  },
};
</script>

<style scoped></style>
