<template>
  <img src="../assets/wave.png" class="wave" alt="login-wave" />
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="../assets/login.svg" class="responsive" alt="login-image" />
    </div>
    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
      }"
      class="col-12 col-md-6 flex content-center"
    >
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }"
      >
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="../assets/avatar.svg" alt="avatar" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <div class="text-h4 text-uppercase q-my-none text-weight-regular">
                Home-Flix
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="onSubmit">
            <q-input
              label="Username"
              v-model="username"
              :model-value="username"
              :rules="[(val) => !!val || 'Field is required']"
              autocomplete="on"
            >
            </q-input>
            <q-input
              label="Password"
              type="password"
              v-model="password"
              :model-value="password"
              :rules="[(val) => !!val || 'Field is required']"
              autocomplete="on"
            >
            </q-input>
            <div>
              <q-btn
                class="full-width"
                color="primary"
                :label="label"
                type="submit"
                :loading="spinner"
                rounded
              >
                <template v-slot:loading>
                  <q-spinner color="white" />
                </template>
              </q-btn>
              <div class="text-center q-mt-sm q-gutter-lg">
                <a class="text-white cursor-pointer" v-on:click="setLabel()">
                  {{ getLabel() }}
                </a>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import useQuasar from "quasar/src/composables/use-quasar";
import { ref } from "vue";
import { useAuthStore } from "stores/Auth-store";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "TestLogin",
  setup() {
    const username = ref("Selam");
    const password = ref("12345678");
    const spinner = ref(false);
    const label = ref("Login");
    const store = useAuthStore();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    return {
      username,
      password,
      spinner,
      label,
      onSubmit() {
        if (!username.value || !password.value) {
          $q.notify({
            type: "negative",
            message: "username or password can not be empty",
          });
        } else {
          spinner.value = true;
          if (label.value === "Login") {
            store
              .login({ username: username.value, password: password.value })
              .then(() => {
                spinner.value = false;
                $q.notify({
                  type: store.error ? "negative" : "positive",
                  message: store.message,
                  position: "center",
                });
                if (!store.error) {
                  router.push({
                    name: "Home",
                    query: {
                      ...route.query,
                    },
                  });
                }
              });
          }
          if (label.value === "Register") {
            store
              .register({ username: username.value, password: password.value })
              .then(() => {
                spinner.value = false;
                $q.notify({
                  type: store.error ? "negative" : "positive",
                  message: store.message,
                  position: "center",
                });
                label.value = "Login";
              });
          }
        }
      },
      getLabel() {
        if (label.value === "Register") {
          return "Login";
        } else {
          return "Register";
        }
      },
      setLabel() {
        if (label.value === "Login") {
          label.value = "Register";
        } else {
          label.value = "Login";
        }
      },
    };
  },
};
</script>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
