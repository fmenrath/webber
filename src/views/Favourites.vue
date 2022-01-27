<template>
   <ul>
      <li v-for="item in favouriteMovies" :key="item.id">
         <span>{{item.name}}</span>
      </li>
   </ul>
</template>


<script>
// import axios from "axios";

export default {
  name: 'Home',
  data(){
    return{
      favouriteMovies: this.favouriteMovies,
      favouriteShows: this.favouriteShows
    }
  },
  created(){
     this.fix = this.favouriteMovies
  }
}
</script>