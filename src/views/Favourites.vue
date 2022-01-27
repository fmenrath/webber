<template>
   <div class="favourites-wrapper">
      <div class="favourites">
         <div class="favourite-movies">
            <h1 class="favourites-header">Your favourite <span class="white">movies</span></h1>
            <ul v-if="favouriteMovies.length>0">
               <li v-for="movie in favouriteMovies" :key="movie.id">
                  <router-link :to="{ path: '/movie/' + movie.id}">
                     <div class="favourite-entry" :style="{background: 'linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%), url(https://image.tmdb.org/t/p/original'+movie.backdrop_path+')'}">
                        <div class="favourite-content">
                           <div class="favourite-info">
                              <h2 class="favourite-name">{{movie.title}}</h2>
                              <span class="favourite-year_runtime">{{movie.release_date.slice(0,4)}}&nbsp;&nbsp;&nbsp;&nbsp;{{convertRuntime(movie.runtime)}}</span>
                              <div class="favourite-genre-list">
                                 <span v-for="genre in movie.genres" :key="genre.id">{{genre.name}}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </router-link>
                  <div class="remove-favourite" @click="removeFromFavouriteMovies(movie.id)">
                     <img src="../assets/minus.svg" class="remove-favourite" alt="remove favourite">
                  </div>
               </li>
            </ul>
            <div v-else class="no-favourites">You do not have any favourite movies. <br> Add them to to this list with the  ♡ - icon.  </div>
         </div>
         <div class="favourite-shows">
            <h1 class="favourites-header">Your favourite <span class="white">TV shows</span></h1>
            <ul v-if="favouriteShows.length>0">
               <li v-for="show in favouriteShows" :key="show.id">
                  <router-link :to="{ path: '/tv/' + show.id}">
                     <div class="favourite-entry" :style="{backgroundImage:'linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url(https://image.tmdb.org/t/p/original'+show.backdrop_path+')'}">
                        <div class="favourite-content">
                           <div class="favourite-info">
                              <h2 class="favourite-name">{{show.name}}</h2>
                              <span>{{show.first_air_date.slice(0,4)}}-{{show.last_air_date.slice(0,4)}}, 
                                 <span v-if="show.seasons.length==1">{{show.seasons.length}} season</span>
                                 <span v-else>{{show.seasons.length}} seasons</span>
                              </span>
                              <div class="favourite-genre-list">
                                 <span v-for="genre in show.genres" :key="genre.id">{{genre.name}}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </router-link>
                  <div class="remove-favourite" @click="removeFromFavouriteShows(show.id)">
                     <img src="../assets/minus.svg" class="remove-favourite" alt="remove favourite">
                  </div>
               </li>
            </ul>
            <div v-else class="no-favourites">You do not have any favourite TV shows. <br>Add them to to this list with the  ♡ - icon.  </div>
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
      },
      removeFromFavouriteMovies(number){
         this.$emit('removeFromFavouriteMovies', number)
      },
      removeFromFavouriteShows(number){
         this.$emit('removeFromFavouriteShows', number)
      }
   }
}
</script>