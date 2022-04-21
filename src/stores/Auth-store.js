import { defineStore } from 'pinia';
import { api } from 'boot/axios'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    token:0,
    user:{}
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
   async login ({ commit }, form) {
       console.log('jere',form)
      return await api.post('/auth/login', form)
          .then(response => {
            api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
            commit('login', {token: response.data.token, user: response.data.username})
          })
    }
  },
});
