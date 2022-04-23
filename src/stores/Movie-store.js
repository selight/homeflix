import { defineStore } from 'pinia';
import { api } from 'boot/axios'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movie:null,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async getMovies(){
      return await api.get('/tmdb').then((response)=>{
        console.log(response.data.data)
        return response.data.data
      }).catch((error)=>{
        console.log(error)
      })
    }

  }
})
