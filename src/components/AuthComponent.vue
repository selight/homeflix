<template>
  <q-card class="q-pa-md" style="width: 400px;">
<q-form @submit="onSubmit">
  <q-input
      ref="inputRef"
      filled
      v-model="name"
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
import {useQuasar} from "quasar";

export default {
  name: "AuthComponent",
  setup(){
    const name = ref(null)
    const password = ref(null)
    const accept = ref(false)
    const $q = useQuasar()
    return{
      name,
      password,
      accept,
      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },
    }
  }
}
</script>

<style scoped>

</style>
