<template>
  <q-card class="q-pa-md" style="width: 800px">
    <div class="text-h6" v-if="!movieStore.$state.edit">Add Your Movies</div>
    <div class="text-h6" v-if="movieStore.$state.edit">Edit Your Movie</div>
    <q-form class="column q-gutter-xs">
      <q-input
        v-model="search"
        autofocus
        debounce="1000"
        :loading="loadingState"
        type="search"
        hint="Search your movies from imdb"
        :model-value="search"
        label="Search"
        class="col"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
        <q-menu fit auto-close v-model="menu">
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

              <q-item-section side top>
                <q-badge color="primary" :label="movies.rating" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-input>
      <!--      Physical Location-->
      <q-input
        type="text"
        class="col"
        filled
        label="Physical Location *"
        v-model="physicalProperties.physicalLocation"
        :rules="[(val) => !!val || 'Field is required']"
        :model-value="physicalProperties.physicalLocation"
      ></q-input>
      <!--      Title-->
      <q-input
        type="text"
        class="col"
        filled
        label="Title *"
        v-model="movie.title"
        :rules="[(val) => !!val || 'Field is required']"
        :model-value="movie.title"
      >
      </q-input>
      <!--      Description-->
      <q-input
        type="text"
        class="col"
        filled
        autogrow
        label="Description *"
        v-model="movie.description"
        :model-value="movie.description"
        :rules="[(val) => !!val || 'Field is required']"
      ></q-input>
      <!--      Poster-->
      <q-input
        type="text"
        class="col"
        filled
        autogrow
        label="Poster *"
        v-model="movie.poster"
        :model-value="movie.poster"
        readonly
      ></q-input>
      <!--      Add more Section-->
      <q-input
        v-if="addMore"
        type="text"
        class="col"
        filled
        label="Physical ID"
        v-model="physicalProperties.physicalId"
        :model-value="physicalProperties.physicalId"
      >
      </q-input>
      <q-select
        v-if="addMore"
        filled
        class="col-1"
        v-model="physicalProperties.storageType"
        use-input
        use-chips
        input-debounce="0"
        @new-value="createValue"
        :options="filterOptions"
        @filter="filterFn"
        label="Storage Type"
        hint="VHS,DVD.."
      />
      <q-input
        v-if="addMore"
        label="Release Date"
        class="col-1"
        filled
        v-model="movie.release_date"
        :model-value="movie.release_date"
      >
      </q-input>
      <!--      Buttons-->
      <div class="row justify-between">
        <q-btn
          icon="add"
          v-if="!addMore"
          label="Add More Info"
          color="accent"
          v-on:click="addMore = true"
        >
        </q-btn>
        <q-btn
          :label="movieStore.$state.edit ? 'Update' : 'Submit'"
          color="primary"
          v-on:click="submit"
          :loading="spinner"
        >
          <template v-slot:loading> <q-spinner color="white" /> </template>
        </q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<script>
import { defineComponent, ref, watch, computed } from "vue";
import { useMovieStore } from "stores/Movie-store";
import useQuasar from "quasar/src/composables/use-quasar";
const storageTypeOptions = ["VHS", "DVD", "BlueRay"];

export default defineComponent({
  name: "addMovieComponent",
  setup() {
    const movieStore = useMovieStore();
    const search = ref(movieStore.$state.search);
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
      physicalLocation: movie.value.physicalLocation || "N/A",
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
          if (r.length > 0) {
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
          } else {
            movie.value = movies;
          }
        });
      },
      createValue(val, done) {
        if (val.length > 0) {
          if (!storageTypeOptions.includes(val)) {
            storageTypeOptions.push(val);
          }
          done(val, "toggle");
        }
      },

      filterFn(val, update) {
        update(() => {
          if (val === "") {
            filterOptions.value = storageTypeOptions;
          } else {
            const needle = val.toLowerCase();
            filterOptions.value = storageTypeOptions.filter(
              (v) => v.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      },
    };
  },
});
</script>

<style scoped></style>
