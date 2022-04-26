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
          </div>
          <div class="text-caption text-grey">{{singleMovie.releaseDate}}</div>
          <div class="text-caption">
            {{singleMovie.description}}
          </div>
          <q-badge color="primary" :label="singleMovie.rating" />
          <a class="text-primary q-ml-md" :href="singleMovie.trailer">Watch Trailer</a>
        </q-card-section>
      </q-card-section>
    </q-card>
</template>
<script>
    import {useMovieStore} from "stores/Movie-store";

    export default {
        name: "movieDetailComponent",
        setup(){
          const store=useMovieStore();
          return{
            store
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
