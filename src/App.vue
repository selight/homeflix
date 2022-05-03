<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import {useAuthStore} from "stores/Auth-store";
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
  name: 'App',
  setup(){
    const router = useRouter();
    return {router}
  },
  async created() {
    let store = useAuthStore();
    const route = useRoute();
    await store.getAuthUser().catch((error)=>{
      this.router.push({
        name: "SignIn",
        query: {
          ...route.query,
        },
      });
    });
  }
})
</script>
