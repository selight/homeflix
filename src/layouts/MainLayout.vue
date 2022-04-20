<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="bg-transparent">
      <q-toolbar dense>
        <q-avatar square>
          <img alt="homeflix" src="../assets/netflix.png">
        </q-avatar>
        <q-space/>
        <div class="row justify-evenly q-gutter-md gt-xs" >
        <q-btn-dropdown class="col" flat label="All " dense>
          <q-list>
            <q-item clickable v-close-popup></q-item></q-list>
        </q-btn-dropdown>
        <q-btn-dropdown  class="col" flat  label="movies" dense>
          <q-list>
            <q-item clickable v-close-popup></q-item></q-list>
        </q-btn-dropdown>
        <q-btn-dropdown  class="col" flat label="Tv shows" dense>
          <q-list>
            <q-item clickable v-close-popup></q-item></q-list>
        </q-btn-dropdown>
        </div>
        <q-toolbar-title>

        </q-toolbar-title>
        <q-btn flat round dense icon="search" />
        <q-btn flat round dense icon="person" />
      </q-toolbar>
      <q-toolbar inset class="xs">
        <div class="row justify-start q-gutter-md text-caption"  >
          <q-btn-dropdown class="col" flat label="All " size="10px" dense>
            <q-list class="text-caption">
              <q-item clickable v-close-popup></q-item></q-list>
          </q-btn-dropdown>
          <q-btn-dropdown  class="col" flat  label="movies" size="10px"  dense>
            <q-list>
              <q-item clickable v-close-popup></q-item></q-list>
          </q-btn-dropdown>
          <q-btn-dropdown  class="col" flat label="Tv shows" size="10px" dense>
            <q-list>
              <q-item clickable v-close-popup></q-item></q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MainLayout',

  components: {

  },

  setup () {
    return {

    }
  }
})
</script>
