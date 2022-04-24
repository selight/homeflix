<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import {useAuthStore} from "stores/Auth-store";

export default defineComponent({
  name: 'App',
  created() {
    let store = useAuthStore();
    store.getAuthUser();
    console.log('dsf',store.$state.user)
  }
})
</script>
