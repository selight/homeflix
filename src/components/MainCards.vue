<template>
  <Splide :options="{
      type  : 'loop',
      perPage : 4,
      gap:'0.5em',
      focus  : 'center',
      heightRatio:height,
      perMove:1,
      arrows:false,
      pagination:false,
        breakpoints: {
		500: {
			perPage: 2,
		},
  }
    }" aria-label="My Favorite Images">
    <SplideSlide v-for="(image,i) in list" :key="i">
      <img alt="movie" style="display: flex; width: 100%; height: 100%" :src="image.img"/>
    </SplideSlide>
  </Splide>
</template>
<script>
import {Splide, SplideSlide} from '@splidejs/vue-splide';

import '@splidejs/vue-splide/css';

export default {
  name: "MainCards",
  components: {
    Splide,
    SplideSlide
  },
  props: {
    height: {
      type: Number,
    }
  },
  setup() {
    const list =
        [{
          img: 'https://www.joblo.com/wp-content/uploads/2021/07/thor-love-thunder-1.jpg'
        },
          {
            img: 'https://www.joblo.com/wp-content/uploads/2019/12/bobs-burgers-movie.jpg'
          },
          {
            img: 'https://www.joblo.com/wp-content/uploads/2022/03/umma-poster-400x600.jpg'
          },
          {
            img: 'https://www.joblo.com/wp-content/uploads/2018/02/red-notice-poster.jpg'
          }
        ]
    return {
      list
    };
  },
}
</script>

<style scoped>

</style>
