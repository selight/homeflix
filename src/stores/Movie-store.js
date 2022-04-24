import { defineStore } from 'pinia';
import { api } from 'boot/axios'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movie:null,
    addDialog:false,
    detailDialog:false
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async getMovies(){
      return await api.get('/tmdb').then((response)=>{
        return response.data.data
      }).catch((error)=>{
        console.log(error)
      })
    },
    async searchMovies(searchTerm){
      return await api.get('/tmdb?query='+searchTerm).then((response)=>{
       return response.data.data
      }).catch((error)=>{
        console.log(error)
      })
    },
    async addMovie(movie){
      return  await  api.post('/movies',movie).then((response)=>{
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })
    },
    async getMyMovies(){
      return await api.get('/movies').then((response)=>{
        return response.data.data
      }).catch((error)=>{
        console.log(error)
      })
    },
    async searchMyMovies(searchTerm){
      return await api.get('/movies?query='+searchTerm,searchTerm).then((response)=>{
        return response.data.data
      })
    },
    async getMovieDetails(id){
      return await api.get('/tmdb/'+id).then((response)=>{
        return response.data.data
      })
    }
  }
})
