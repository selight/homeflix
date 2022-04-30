<template>
    <q-card class="my-card" flat bordered>
      <div class="row justify-end">
        <q-btn icon="close" flat round dense v-close-popup />
      </div>
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            :src="singleMovie.backdrop || singleMovie.poster"
          />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">{{singleMovie.title}}
            <q-badge color="primary" :label="singleMovie.rating" />
          </div>
          <div class="text-caption text-grey">
            {{singleMovie.release_date}}
            <a class="text-primary q-ml-md" :href="singleMovie.trailer">Watch Trailer</a>
          </div>
          <div class="text-overline">
            Physical Location: {{singleMovie.physicalLocation}}
          </div>
          <div class="text-overline">
            Storage Type: {{singleMovie.storageType}}
          </div>
          <div class="text-overline">
            Genre: {{singleMovie.genre}}
          </div>
          <div class="q-gutter-sm">
            <q-btn class="q-py-0 q-my-0" color="primary text-caption" v-close-popup  v-on:click="edit()">Edit</q-btn>
            <q-btn class="q-py-0 q-my-0" color="primary text-caption" v-close-popup v-on:click="deleteMovie()">Delete</q-btn>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
</template>
<script>
    import {useMovieStore} from "stores/Movie-store";
    import useQuasar from "quasar/src/composables/use-quasar";
    export default {
        name: "movieDetailComponent",
        setup(props){
          const movieStore=useMovieStore();
          const $q = useQuasar();
          return{
            movieStore,
            edit(){
              movieStore.$state.addDialog=true;
              movieStore.$state.edit=true;
              movieStore.$state.movie=props.singleMovie;
              movieStore.$state.fromHome=true;
            },
            deleteMovie(){
                movieStore.deleteMovie(props.singleMovie._id).then((res)=>{
                  if(res){
                    $q.notify({
                      type: "negative",
                      message: "You have successfully deleted your movie",
                      position: "center",
                    });
                    window.location.reload()
                  }
                });
            }
          }
        },
      props:{
          singleMovie: {
            type:Object
          }
      }
    }
</script>

<style scoped>

</style>
