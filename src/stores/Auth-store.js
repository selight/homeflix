import { defineStore } from 'pinia';
import { api } from 'boot/axios'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem("token"),
    user:null,
    loginDialog:false,
    isAuth:false,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
   async login (form) {
      return await api.post('/auth/login', form,)
          .then(response => {
              let token = 'Bearer ' + response.data.data.token
            this.token=token;
              localStorage.setItem("token", token);
               this.getAuthUser();
          }).catch((error)=>{
            if(error.status===400){
              console.log('err','jj')
            }

        })
    },
    async register(form) {
      return await api.post('/auth/register', form,)
        .then(response => {
          return response.data.data
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
    async getAuthUser(){
      api.defaults.headers.common['Authorization']=this.token
      return await api.get('/auth/getUser').then((response)=> {
          this.user = {id: response.data.user.id, username: response.data.user.username}
          this.isAuth = response.data.isAuth;
      }).catch(async (error)=> {
        await this.logout();
      })
    }
  },
});
