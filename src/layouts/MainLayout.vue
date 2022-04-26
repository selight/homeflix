<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="bg-transparent">
      <q-toolbar dense>
        <q-avatar square>
          <img alt="homeflix" src="../assets/netflix.png" />
        </q-avatar>
        <q-space />
        <div class="row justify-evenly q-gutter-md gt-xs">
          <q-btn-dropdown class="col" flat label="All " dense>
            <q-list> <q-item clickable v-close-popup></q-item></q-list>
          </q-btn-dropdown>
          <q-btn-dropdown class="col" flat label="movies" dense>
            <q-list> <q-item clickable v-close-popup></q-item></q-list>
          </q-btn-dropdown>
          <q-btn-dropdown class="col" flat label="Tv shows" dense>
            <q-list> <q-item clickable v-close-popup></q-item></q-list>
          </q-btn-dropdown>
        </div>
        <q-toolbar-title> </q-toolbar-title>
        <q-input
          dense
          standout
          v-model="text"
          input-class="text-right"
          debounce="500"
          :loading="loadingState"
          class="q-ml-md"
        >
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>
        </q-input>
        <q-menu fit auto-close v-if="menu" v-model="menu">
          <q-list
            v-for="(movies, i) in searchResult"
            :key="i"
            style="min-width: 100px"
          >
            <q-item clickable v-close-popup v-on:click="()=>{this.detailDialog=true;this.singleMovie=movies}">
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

        <q-btn flat round dense icon="person" v-on:click="store.user ? openMenu() : store.$state.loginDialog=true ">
          <q-menu
            fit
            v-model="menus"
            v-if="menus"
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list style="min-width: 100px">
              <q-item v-on:click="logout" clickable v-close-popup>
                <q-item-section>Log Out</q-item-section>
              </q-item>
              <q-item v-on:click="movieStore.$state.addDialog=true" clickable v-close-popup>
                <q-item-section>Add Movies</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
      <q-toolbar inset class="xs">
        <div class="row justify-start q-gutter-md text-caption">
          <q-btn-dropdown class="col" flat label="All " size="10px" dense>
            <q-list class="text-caption">
              <q-item clickable v-close-popup></q-item
            ></q-list>
          </q-btn-dropdown>
          <q-btn-dropdown class="col" flat label="movies" size="10px" dense>
            <q-list> <q-item clickable v-close-popup></q-item></q-list>
          </q-btn-dropdown>
          <q-btn-dropdown class="col" flat label="Tv shows" size="10px" dense>
            <q-list> <q-item clickable v-close-popup></q-item></q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-dialog v-model="store.$state.loginDialog">
        <auth-component></auth-component>
      </q-dialog>
      <q-dialog v-model="movieStore.$state.addDialog">
        <add-movie-component></add-movie-component>
      </q-dialog>
      <router-view />
    </q-page-container>
    <q-dialog v-model="detailDialog" position="bottom">
      <movie-detail-component :single-movie="singleMovie"></movie-detail-component>
    </q-dialog>
  </q-layout>
</template>

<script>
  import {defineComponent, ref, watch} from "vue";
import AuthComponent from "components/AuthComponent.vue";
import { useAuthStore } from "stores/Auth-store";
import {useMovieStore} from "stores/Movie-store";
import AddMovieComponent from "components/addMovieComponent.vue";
import MovieDetailComponent from "components/movieDetailComponent.vue";
export default defineComponent({
  name: "MainLayout",
  components: {
    AddMovieComponent,
    AuthComponent,
    MovieDetailComponent
  },

  setup() {
    const store = useAuthStore();
    const movieStore = useMovieStore();
    const text = ref("");
    const menus = ref(false);
    const menu = ref(false);
    const searchResult= ref([]);
    const loadingState=ref(false)
    const detailDialog=ref(false);
    const singleMovie=ref(null)
    watch(text, async (value) => {
      loadingState.value = true;
      await movieStore.searchMyMovies(value).then((movies) => {
        if(movies.length>0) {
          searchResult.value = movies.slice(0, 6);
          loadingState.value = false;
          menu.value = true;
        }
      });
    });
    return {
      text,
      store,
      menus,
      menu,
      movieStore,
      loadingState,
      searchResult,
      detailDialog,
      singleMovie,
        logout() {
        return store.logout();
      },
      openMenu(){
        menus.value=true
      },
    };
  },
});
</script>
