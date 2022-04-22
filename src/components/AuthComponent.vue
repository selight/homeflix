<template>
  <q-card class="q-pa-md" style="width: 400px;">
<q-form @submit="onSubmit">
  <q-input
      ref="inputRef"
      filled
      v-model="username"
      label="User Name"
      :rules="[val => !!val || 'Field is required']"
  />
  <q-input
      ref="inputRef"
      filled
      type="password"
      v-model="password"
      label="Password"
      :rules="[val => !!val || 'Field is required']"
  />

  <q-toggle v-model="accept" label="I accept the license and terms" />
  <br/>
  <q-btn label="Log In" type="submit" color="primary"/>
</q-form>
  </q-card>
</template>

<script>
import {ref} from "vue";
import { useAuthStore } from 'stores/Auth-store'


export default {
  name: "AuthComponent",
  setup(){
    const username = ref(null)
    const password = ref(null)
    const accept = ref(false)
    const store = useAuthStore()
    const { login } = store

    return{
      username,
      password,
      accept,
      onSubmit () {
        if (accept.value !== true){

        }
        else {
          login({username:username.value,password:password.value})
        }
      },
    }
  }
}
</script>

<style scoped>

</style>
