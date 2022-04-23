<template>
  <q-card class="q-pa-md" style="width: 800px">
    <div class="text-h6">Add Your Movies</div>
    <q-form class="column q-gutter-sm">
      <q-input
        v-model="search"
        autofocus
        debounce="500"
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
            <q-item clickable v-close-popup v-on:click="movie = movies">
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
      <q-input
        type="text"
        class="col"
        filled
        label="Title"
        v-model="movie.title"
        :rules="[(val) => !!val || 'Field is required']"
        :model-value="movie.title"
      >
      </q-input>
      <q-input
        type="text"
        class="col"
        filled
        label="Physical Location"
        v-model="movie.physicalLocation"
        :rules="[(val) => !!val || 'Field is required']"
        :model-value="movie.physicalLocation"
      >
      </q-input>
      <q-input
        type="text"
        class="col"
        filled
        label="Physical ID"
        v-model="movie.physicalID"
        :model-value="movie.physicalID"
      >
      </q-input>
      <q-input
        v-if="addMore"
        label="Release Date"
        class="col-1"
        type="date"
        filled
        v-model="movie.release_date"
        :model-value="movie.release_date"
        :rules="[(val) => !!val || 'Field is required']"
      >
      </q-input>
      <q-input
        v-if="addMore"
        type="text"
        class="col-1"
        filled
        autogrow
        label="Description"
        v-model="movie.description"
        :model-value="movie.description"
      ></q-input>
      <q-select
        v-if="addMore"
        filled
        class="col-1"
        v-model="movie.storageType"
        use-input
        use-chips
        input-debounce="0"
        @new-value="createValue"
        :options="filterOptions"
        @filter="filterFn"
        label="Storage Type"
        hint="VHS,DVD.."
      />
      <!--      Buttons-->
      <div class="row justify-between">
        <q-btn icon="add" v-if="!addMore" label="Add More Info" color="accent" v-on:click="addMore=true"> </q-btn>
        <q-btn label="Submit" color="primary" v-on:click="submit"> </q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useMovieStore } from "stores/Movie-store";
const storageTypeOptions = [
  'VHS', 'DVD', 'BlueRay'
]

export default defineComponent({
  name: "addMovieComponent",
  setup() {
    const search = ref("");
    const store = useMovieStore();
    const searchResult = ref([]);
    const menu = ref(false);
    const loadingState = ref(false);
    const addMore = ref(false)
    const movie = ref({
      title: "",
      description: "",
      release_date: Date.now(),
      physicalLocation:"",
      physicalID:"",
      storageType:null,
      genre:[],
      rating:null,
      poster:null,
      backDrop:null,
      userId:'625fff6768c8c178680946d7'
    });
    watch(search, (value) => {
      searchMovies(value);
    });
    const filterOptions = ref(storageTypeOptions)
    const searchMovies = (value) => {
      loadingState.value = true;
      store.searchMovies(value).then((movies) => {
        searchResult.value = movies.slice(0, 6);
        loadingState.value = false;
        menu.value = true;
      });
    };
    return {
      search,
      store,
      menu,
      searchResult,
      loadingState,
      movie,
      filterOptions,
      addMore,
      submit(){
        store.addMovie(movie.value)
      },
      createValue (val, done) {
        if (val.length > 0) {
          if (!storageTypeOptions.includes(val)) {
            storageTypeOptions.push(val)
          }
          done(val, 'toggle')
        }
      },

      filterFn (val, update) {
        update(() => {
          if (val === '') {
            filterOptions.value = storageTypeOptions
          }
          else {
            const needle = val.toLowerCase()
            filterOptions.value = storageTypeOptions.filter(
              v => v.toLowerCase().indexOf(needle) > -1
            )
          }
        })
      }
    }
    },
});
</script>

<style scoped></style>
