<template>
  <q-card class="q-pa-md" style="width: 400px">
    <q-form @submit="onSubmit">
      <q-input
        ref="inputRef"
        filled
        v-model="username"
        label="User Name"
        :rules="[(val) => !!val || 'Field is required']"
        autocomplete="on"
        :model-value="username"
      />
      <q-input
        ref="inputRef"
        filled
        type="password"
        v-model="password"
        label="Password"
        :rules="[(val) => !!val || 'Field is required']"
        autocomplete="on"
        :model-value="password"
      />

      <q-toggle
        v-model="accept"
        label="I accept the license and terms"
        :model-value="accept"
      />
      <br />
      <q-btn
        :loading="spinner"
        label="Log In"
        type="submit"
        color="primary"
      >
        <template v-slot:loading>
          <q-spinner-ball color="white" />
        </template>
      </q-btn>
    </q-form>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "stores/Auth-store";
import useQuasar from "quasar/src/composables/use-quasar";

export default {
  name: "AuthComponent",
  setup() {
    const username = ref("Selam");
    const password = ref("12345678");
    const accept = ref(false);
    const spinner = ref(false);
    const close = ref(0);
    const store = useAuthStore();
    const $q = useQuasar();
    return {
      username,
      password,
      accept,
      spinner,
      close,
      onSubmit() {
        if (accept.value !== true) {
        } else {
          spinner.value = true;
          store
            .login({ username: username.value, password: password.value })
            .then(() => {
              spinner.value = false;
              store.$state.loginDialog=false;
              $q.notify({type: 'positive',message:'You have successfully logged In',position:'center'})
            })
            .catch((error) => {
             console.log(error)
            });
        }
      },
    };
  },
};
</script>

<style scoped></style>
