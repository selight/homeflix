<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import {useAuthStore} from "stores/Auth-store";

export default defineComponent({
  name: 'App',
  async created() {
    let store = useAuthStore();
    await store.getAuthUser();
  }
})
</script>
