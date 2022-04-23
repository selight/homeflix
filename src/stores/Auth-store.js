import { defineStore } from 'pinia';
import { api } from 'boot/axios'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    loggedIn: !!localStorage.getItem("token"),
    user:null,
    loginDialog:false,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
   async login (form) {
      return await api.post('/auth/login', form)
          .then(response => {
            console.log(response)
              let token = 'Bearer ' + response.data.data.token
              this.user = {id: response.data.data.id, username: response.data.data.username}
              localStorage.setItem("token", token);
              api.defaults.headers.common['Authorization'] = token;
          }).catch((error)=>{
            if(error.status===400){
              console.log('err','jj')
            }

        })
    },
    async logout() {
        localStorage.removeItem("token");
        this.$reset();
    },
  },
});
