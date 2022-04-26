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
            <q-item clickable v-close-popup v-on:click="()=>{this.movie = movies;this.physicalProperties.releaseDate=this.movies.releaseDate}">
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
        label="Title *"
        v-model="movie.title"
        :rules="[(val) => !!val || 'Field is required']"
        :model-value="movie.title"
      >
      </q-input>
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
      <q-input
        type="text"
        class="col"
        filled
        label="Physical Location *"
        v-model="physicalProperties.physicalLocation"
        :rules="[(val) => !!val || 'Field is required']"
        :model-value="physicalProperties.physicalLocation"
      >
      </q-input>
      <q-input
        type="text"
        class="col"
        filled
        autogrow
        label="Poster *"
        v-model="movie.poster"
        :model-value="movie.poster"
        :rules="[(val) => !!val || 'Field is required']"
        hint="please input the image url"
      ></q-input>
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
        v-model="physicalProperties.releaseDate"
        :model-value="physicalProperties.releaseDate"
      >
      </q-input>
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
      genre:[],
      rating:null,
      poster:null,
      backDrop: ''
    });
    const physicalProperties = ref({
      physicalLocation:"",
      physicalId:"",
      storageType:null,
      releaseDate: '',
    })
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
    setTimeout()
    return {
      search,
      store,
      menu,
      searchResult,
      loadingState,
      movie,
      filterOptions,
      addMore,
      physicalProperties,
      submit(){
        delete movie.value.id;
        delete movie.value.release_date;
        delete movie.value.backdrop;
        let userMovies = {...movie.value, ...physicalProperties.value};
        store.addMovie(userMovies)
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
