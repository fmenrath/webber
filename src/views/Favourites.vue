<template>
   <h1>Favourite Movies</h1>
   <ul>
      <li v-for="movie in favouriteMovies" :key="movie.id">
         <span>{{movie.id}}</span>
      </li>
   </ul>
   <h1>Favourite Shows</h1>
   <ul>
      <li v-for="show in favouriteShows" :key="show.id">
         <span>{{show.id}}</span>
      </li>
   </ul>
</template>


<script>
// import axios from "axios";

export default {
   name: 'Home',
   data(){
      return{
      }
   },
   props: ['favouriteMovies', 'favouriteShows']
}
</script>