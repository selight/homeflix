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
          dark
          dense
          standout
          v-model="text"
          input-class="text-right"
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
        <q-btn flat round dense icon="person" v-on:click="store.user ? menus.value=true : store.$state.loginDialog=true ">
          <q-menu
            fit
            v-model="menus"
            :model-value="menus"
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list style="min-width: 100px">
              <q-item v-on:click="logout" clickable v-close-popup>
                <q-item-section>Log Out</q-item-section>
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import AuthComponent from "components/AuthComponent.vue";
import { useAuthStore } from "stores/Auth-store";
export default defineComponent({
  name: "MainLayout",
  components: {
    AuthComponent,
  },

  setup() {
    const store = useAuthStore();
    const text = ref("");
    const menus = ref(false);
    return {
      text,
      store,
      menus,
        logout() {
        return store.logout();
      }
    };
  },
});
</script>
