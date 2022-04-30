import { defineStore } from 'pinia';
import { api } from 'boot/axios'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movie:{
      title: "",
      description: "",
      genre:[],
      rating:null,
      poster:null,
      backDrop: '',
      release_date:''
    },
    addDialog:false,
    detailDialog:false,
    search:'',
    edit:false,
    fromHome:false,
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
        return response.status
      }).catch((error)=>{
        console.log(error)
      })
    },
    async getMyMovies(){
      return await api.get('/movies/').then((response)=>{
        return response.data.data
      }).catch((error)=>{
        console.log(error)
      })
    },
    //get movie detail from tmdb
    async getOneMovie(id){
      return await api.get('/movies/details/'+id).then((result)=>{
        return result.data.data
      }).catch((error)=>{
        console.log(error)
      })
    },
    async searchMyMovies(searchTerm){
      return await api.get('/movies?query='+searchTerm).then((response)=>{
        return response.data.data
      })
    },
    //get movie detail from our db
    async getMyMovieDetails(id){
      return await api.get('/movies/'+id).then((response)=>{
        return response.data.data[0]
      })
    },
    //edit one movie
    async updateMovie(data){
      return  await api.put('/movies/'+data.id,data.userMovies).then((response)=>{
        return response.status
      }).catch((error)=>{
        console.log(error)
      })
    },
    //delete movie
    async deleteMovie(id){
      return  await  api.delete('/movies/'+id).then((response)=>{
        console.log(response)
        return response.status
      }).catch((error)=>{
        console.log(error)
      })
    }
  }
})
