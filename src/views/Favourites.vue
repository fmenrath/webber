<template>
   <div class="favourites-wrapper">
      <div class="favourites">
         <div class="favourite-movies">
            <h1 class="favourites-header">Your favourite movies</h1>
            <ul v-if="favouriteMovies.length>0">
               <li v-for="movie in favouriteMovies" :key="movie.id">
                  <router-link :to="{ path: '/movie/' + movie.id}">
                     <div class="favourite-entry" :style="{background: 'linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%), url(https://image.tmdb.org/t/p/original'+movie.backdrop_path+')'}">
                        <div class="favourite-info">
                           <h2 class="favourite-name">{{movie.title}}</h2>
                           <p class="favourite-year_runime">{{movie.release_date.slice(0,4)}}&nbsp;&nbsp;&nbsp;&nbsp;{{convertRuntime(movie.runtime)}}</p>
                        </div>
                     </div>
                  </router-link>
               </li>
            </ul>
            <div v-else class="no-favourites">You do not have any favourite movies. Add them to to this list with the  ♡ - icon.  </div>
         </div>
         <div class="favourite-shows">
            <h1 class="favourites-header">Your favourite TV shows</h1>
            <ul v-if="favouriteShows.length>0">
               <li v-for="show in favouriteShows" :key="show.id">
                  <router-link :to="{ path: '/tv/' + show.id}">
                     <div class="favourite-entry" :style="{backgroundImage:'linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url(https://image.tmdb.org/t/p/original'+show.backdrop_path+')'}">
                        <div class="favourite-info">
                           <h2 class="favourite-name">{{show.name}}</h2>
                           <p class="favourite-year"></p>
                        </div>
                     </div>
                  </router-link>
               </li>
            </ul>
            <div v-else class="no-favourites">You do not have any favourite TV shows. Add them to to this list with the  ♡ - icon.  </div>
         </div>
      </div>
   </div>
</template>


<script>
// import axios from "axios";

export default {
   name: 'Home',
   data(){
      return{
      }
   },
   props: ['favouriteMovies', 'favouriteShows'],
   methods: {
      convertRuntime(time){
         var hours = Math.floor(time/60)
         var minutes = time % 60
         return hours+'h ' + minutes + 'min'
      }
   }
}
</script>