<template>

  <q-card class="my-card" flat bordered>
    <div class="row full-width  justify-end">
      <q-btn icon="close" flat round dense v-close-popup />
    </div>
    <q-img :src="singleMovie.backdrop" class="full-width">
      <div class=" full-width full-height">
        <div class="column justify-evenly q-gutter-sm">
          <div class="text-h5">Title: {{ singleMovie.title }}</div>
          <div class="text-subtitle1">
            Physical Location: {{ singleMovie.physicalLocation }}
          </div>
          <div class="text-subtitle1">
            Storage Type: {{ singleMovie.storageType }}
          </div>
          <div class="text-subtitle1">Physical-ID: {{ singleMovie.physicalId }}</div>
          <div class="text-subtitle1 gt-sm">Genre: {{ singleMovie.genre }}</div>
        </div>
        <div class=" q-ma-sm absolute-bottom row q-gutter-sm">
          <q-btn
            class="q-py-0 q-my-0"
            color="positive text-caption"
            v-close-popup
            :to="singleMovie.trailer || 'https://youtube.com'"
          >Trailer</q-btn
          >
          <q-btn
            class="q-py-0 q-my-0"
            color="blue text-caption"
            v-close-popup
            v-on:click="edit()"
          >Edit</q-btn
          >
          <q-space />
          <q-btn
            class="q-py-0 q-my-0"
            color="primary text-caption"
            v-close-popup
            v-on:click="deleteMovie()"
          >Delete</q-btn
          >
        </div>
      </div>
    </q-img>

  </q-card>

</template>
<script>
import { useMovieStore } from "stores/Movie-store";
import useQuasar from "quasar/src/composables/use-quasar";
export default {
  name: "movieDetailComponent",
  setup(props) {
    const movieStore = useMovieStore();
    const $q = useQuasar();
    return {
      movieStore,
      edit() {
        movieStore.$state.addDialog = true;
        movieStore.$state.edit = true;
        movieStore.$state.movie = props.singleMovie;
        movieStore.$state.fromHome = true;
      },
      deleteMovie() {
        movieStore.deleteMovie(props.singleMovie._id).then((res) => {
          if (res) {
            $q.notify({
              type: "negative",
              message: "You have successfully deleted your movie",
              position: "center",
            });
            window.location.reload();
          }
        });
      },
    };
  },
  props: {
    singleMovie: {
      type: Object,
    },
  },
};
</script>

<style lang="css" scoped>
.my-card{
  width: 100%;
}
</style>

