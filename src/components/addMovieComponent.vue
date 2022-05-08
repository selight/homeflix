<template>
  <q-card class="q-pa-md" style="width: 100%">
    <div class="text-h6" v-if="!movieStore.$state.edit">Add Your Movies</div>
    <div class="text-h6" v-if="movieStore.$state.edit">Edit Your Movie</div>
    <q-form class="column q-gutter-xs">
      <q-input
        v-if="!movieStore.$state.edit"
        v-model="search"
        ref="searchRef"
        debounce="1000"
        :loading="loadingState"
        type="search"
        hint="Search your movies from imdb"
        :model-value="search"
        label="Search"
        class="col text-h6"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
        <q-menu fit auto-close @focus="this.$refs.searchRef.focus()"  v-model="menu">
          <q-list
            v-for="(movies, i) in searchResult"
            :key="i"
            style="min-width: 100px"
          >
            <q-item clickable v-close-popup v-on:click="setMovie(movies)">
              <q-item-section>
                <q-item-label>{{ movies.title }}</q-item-label>
                <q-item-label caption>{{ movies.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-input>
      <div class="col-1 text-center" v-if="movie.poster">
        <img
          :src="movie.poster"
          style="display: inline-flex; width: 40%; height: 40%"
        >
      </div>
      <!--      Title-->
      <q-input
        type="text"
        class="col"
        dense
        filled
        readonly
        label="Title *"
        v-model="movie.title"
        :rules="[(val) => !!val || 'Field is required']"
        :model-value="movie.title"
      >
      </q-input>
      <!--      Physical Location-->
      <q-input
        type="text"
        class="col"
        filled
        :autofocus="!movieStore.$state.edit"
        label="Physical Location *"
        v-model="physicalProperties.physicalLocation"
        :rules="[(val) => !!val || 'Field is required']"
        :model-value="physicalProperties.physicalLocation"
      ></q-input>
      <q-input
        type="text"
        class="col"
        filled
        label="Physical ID"
        v-model="physicalProperties.physicalId"
        :model-value="physicalProperties.physicalId"
      >
      </q-input>
<label class="text-subtitle1">Storage Type: {{physicalProperties.storageType}}
      <q-btn-toggle
        v-model="physicalProperties.storageType"
        no-caps
        spread
        glossy
        toggle-color="primary"
        :options="filterOptions"
      />
</label>
      <!--      Buttons-->
      <div class="row justify-center q-pt-sm">
        <q-btn
          :label="movieStore.$state.edit ? 'Update' : 'Submit'"
          color="primary"
          size="lg"
          v-on:click="submit"
          :loading="spinner"
          :disable="!(physicalProperties.physicalLocation && movie.title)"
        >
          <template v-slot:loading> <q-spinner color="white" /> </template>
        </q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useMovieStore } from "stores/Movie-store";
import useQuasar from "quasar/src/composables/use-quasar";
const storageTypeOptions = [
  { label: "VHS", value: "VHS" },
  { label: "DVD", value: "DVD" },
  { label: "BlueRay", value: "BlueRay" },
  { label: "Other", value: "Other" },
];

export default defineComponent({
  name: "addMovieComponent",
  setup() {
    const movieStore = useMovieStore();
    const search = ref(movieStore.$state.search);
    const searchRef=ref('');
    const $q = useQuasar();
    const edit = ref(movieStore.$state.edit);
    const id = ref(null);
    const searchResult = ref([]);
    const menu = ref(false);
    const loadingState = ref(false);
    const addMore = ref(false);
    const movie = ref(movieStore.$state.movie);
    const spinner = ref(false);
    const physicalProperties = ref({
      physicalLocation: movie.value.physicalLocation || null,
      physicalId: movie.value.physicalId,
      storageType: movie.value.storageType,
      tmdbId: "",
    });
    watch(search, (value) => {
      searchMovies(value);
    });
    const filterOptions = ref(storageTypeOptions);
    const searchMovies = (value) => {
      loadingState.value = true;
      movieStore.searchMovies(value).then((movies) => {
        searchResult.value = movies.slice(0, 6);
        loadingState.value = false;
        menu.value = true;
      });
    };
    return {
      search,
      searchRef,
      movieStore,
      menu,
      edit,
      id,
      searchResult,
      loadingState,
      movie,
      filterOptions,
      addMore,
      physicalProperties,
      spinner,
      submit() {
        spinner.value = true;
        if (movieStore.$state.edit) {
          let ids = null;
          if (movieStore.$state.fromHome) {
            ids = movie.value._id;
            physicalProperties.value.tmdbId = movie.value.tmdbId;
          } else {
            ids = id.value;
          }
          let userMovies = { ...movie.value, ...physicalProperties.value };
          movieStore
            .updateMovie({ id: ids, userMovies: userMovies })
            .then((res) => {
              if (res) {
                $q.notify({
                  type: "positive",
                  message: "You have successfully updated your movie",
                  position: "center",
                });
                movieStore.$state.addDialog = false;
                spinner.value = false;
              }
            });
        } else {
          physicalProperties.value.tmdbId = movie.value.id.toString();
          delete movie.value.id;
          let userMovies = { ...movie.value, ...physicalProperties.value };
          movieStore.addMovie(userMovies).then((res) => {
            if (res) {
              $q.notify({
                type: "positive",
                message: "You have successfully Added a movie",
                position: "center",
              });
              movieStore.$state.addDialog = false;
              spinner.value = false;
              window.location.reload();
            }
          });
        }
      },
      async setMovie(movies) {
        await movieStore.getOneMovie(movies.id).then((r) => {
          if (r) {
            movieStore.$state.edit = true;
            id.value = r[0]._id;
            let {
              title,
              description,
              genre,
              rating,
              poster,
              backDrop,
              release_date,
              physicalLocation,
              physicalId,
              storageType,
              tmdbId,
            } = r[0];
            physicalProperties.value = {
              physicalLocation,
              physicalId,
              storageType,
              tmdbId,
            };
            movie.value = {
              title,
              description,
              genre,
              rating,
              poster,
              backDrop,
              release_date,
            };
          }
        }).catch((error)=>{
          if(error.response.status===404){
            movie.value = movies;
          }
        });
      },
    };
  },
});
</script>

<style scoped></style>
